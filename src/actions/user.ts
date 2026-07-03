"use server";

import { DbError } from "../errors";
import { logger } from "../logger";
import { prisma } from "../prisma";
import { authActionClient } from "../safe-action";
import { createSubjectSchema, getSubjectsSchema } from "../schemas/user";

export const createSubject = authActionClient
	.inputSchema(createSubjectSchema)
	.action(async ({ parsedInput, ctx }) => {
		const subject = await prisma.subject
			.create({
				data: {
					...parsedInput,
					userId: ctx.user.id,
				},
			})
			.catch((error) => {
				throw new DbError("Failed to create subject", error);
			});

		logger.info("Subject created", { subjectId: subject.id });

		return { message: "Subject created" };
	});

export const getSubjects = authActionClient
	.inputSchema(getSubjectsSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name } = parsedInput;

		const subjects = await prisma.subject
			.findMany({
				where: {
					userId: ctx.user.id,
					...(name && { name: { contains: name, mode: "insensitive" } }),
				},
				orderBy: { id: "desc" },
				take: 30,
			})
			.catch((error) => {
				throw new DbError("Failed to fetch subjects", error);
			});

		logger.info("Subjects fetched", { count: subjects.length });

		return { subjects };
	});

export const getDashboardData = authActionClient
	.action(async ({ ctx }) => {
		const userId = ctx.user.id;

		const [
			noteCount,
			summaryCount,
			subjectCount,
			quizzesTaken,
			recentNotes,
			recentSummaries,
		] = await Promise.all([
			prisma.note.count({ where: { userId } }),
			prisma.summary.count({ where: { userId } }),
			prisma.subject.count({ where: { userId } }),
			prisma.quizAttempt.count({ where: { userId } }),
			prisma.note.findMany({
				where: { userId },
				select: { id: true, title: true, createdAt: true },
				orderBy: { createdAt: "desc" },
				take: 3,
			}),
			prisma.summary.findMany({
				where: { userId },
				select: { id: true, title: true, createdAt: true },
				orderBy: { createdAt: "desc" },
				take: 3,
			}),
		]).catch((error) => {
			throw new DbError("Failed to fetch dashboard data", error);
		});

		const recentActivity = [
			...recentNotes.map((n) => ({ type: "note" as const, id: n.id, title: n.title, createdAt: n.createdAt })),
			...recentSummaries.map((s) => ({ type: "summary" as const, id: s.id, title: s.title, createdAt: s.createdAt })),
		]
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		logger.info("Dashboard data fetched", { userId });

		return {
			noteCount,
			summaryCount,
			subjectCount,
			quizzesTaken,
			recentActivity,
		};
	});
