"use server";

import { z } from "zod";
import { DbError } from "../errors";
import { logger } from "../logger";
import { prisma } from "../prisma";
import { authActionClient } from "../safe-action";

const createSubjectSchema = z.object({
	name: z.string().min(1),
});

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

const getSubjectsSchema = z.object({
	cursor: z.string().uuid().optional(),
	name: z.string().optional(),
});

export const getSubjects = authActionClient
	.inputSchema(getSubjectsSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cursor, name } = parsedInput;

		const subjects = await prisma.subject
			.findMany({
				where: {
					userId: ctx.user.id,
					...(name && { name: { contains: name, mode: "insensitive" } }),
				},
				orderBy: { id: "desc" },
				take: 20,
				...(cursor && { skip: 1, cursor: { id: cursor } }),
			})
			.catch((error) => {
				throw new DbError("Failed to fetch subjects", error);
			});

		const nextCursor =
			subjects.length === 20 ? subjects[subjects.length - 1].id : null;

		return { subjects, nextCursor };
	});
