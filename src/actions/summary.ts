"use server";

import { authActionClient } from "../safe-action";
import { prisma } from "../prisma";
import { DbError } from "../errors";
import { logger } from "../logger";
import { generateSummary } from "../services/summary";
import { createSummarySchema, generateSummarySchema, getSummariesSchema, getSummaryByIdSchema } from "../schemas/summary";

export const createSummary = authActionClient
	.inputSchema(createSummarySchema)
	.action(async ({ parsedInput, ctx }) => {
		const { noteIds, ...rest } = parsedInput;

		const summary = await prisma.summary
			.create({
				data: {
					...rest,
					userId: ctx.user.id,
					...(noteIds && noteIds.length > 0 && { notes: { connect: noteIds.map((id) => ({ id })) } }),
				},
			})
			.catch((error) => {
				throw new DbError("Failed to create summary", error);
			});

		logger.info("Summary created", { summaryId: summary.id });

		return { summaryId: summary.id };
	});

export const generateSummaryAction = authActionClient
	.inputSchema(generateSummarySchema)
	.action(async ({ parsedInput, ctx }) => {
		logger.info("Summary generation started", {
			userId: ctx.user.id,
			noteIds: parsedInput.noteIds,
		});

		const summary = await generateSummary({
			noteIds: parsedInput.noteIds,
			maxWords: parsedInput.maxWords ?? 500,
		});

		logger.info("Summary generation complete", { userId: ctx.user.id });

		return { summary };
	});

export const getSummaries = authActionClient
	.inputSchema(getSummariesSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cursor, title } = parsedInput;

		const summaries = await prisma.summary
			.findMany({
				where: {
					userId: ctx.user.id,
					...(title && { title: { contains: title, mode: "insensitive" } }),
				},
				select: {
					id: true,
					title: true,
					keywords: true,
					createdAt: true,
					updatedAt: true,
				},
				orderBy: { id: "desc" },
				take: 21,
				...(cursor && { skip: 1, cursor: { id: cursor } }),
			})
			.catch((error) => {
				throw new DbError("Failed to fetch summaries", error);
			});

		const hasNextPage = summaries.length === 21;
		const page = hasNextPage ? summaries.slice(0, 20) : summaries;
		const nextCursor = hasNextPage ? page[page.length - 1].id : null;

		return { summaries: page, nextCursor };
	});

export const getSummaryById = authActionClient
	.inputSchema(getSummaryByIdSchema)
	.action(async ({ parsedInput, ctx }) => {
		const summary = await prisma.summary
			.findUnique({
				where: { id: parsedInput.id, userId: ctx.user.id },
			})
			.catch((error) => {
				throw new DbError("Failed to fetch summary", error);
			});

		return { summary };
	});
