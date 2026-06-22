"use server";

import { z } from "zod";
import { authActionClient } from "../safe-action";
import { prisma } from "../prisma";
import { DbError } from "../errors";
import { logger } from "../logger";
import { generateSummary } from "../services/summary";

const createSummarySchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1).optional(),
	keywords: z.array(z.string()),
	content: z.string().min(1),
	subjectId: z.string().uuid().optional(),
	noteIds: z.array(z.string().uuid()).optional(),
});

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

		return { message: "Summary created" };
	});

const generateSummarySchema = z.object({
	noteIds: z.array(z.string().uuid()).min(1),
	maxWords: z.number().int().min(100).max(2000).optional(),
});

export const generateSummaryAction = authActionClient
	.inputSchema(generateSummarySchema)
	.action(async ({ parsedInput, ctx }) => {
		logger.info("Summary generation started", {
			userId: ctx.user.id,
			noteIds: parsedInput.noteIds,
		});

		const result = await generateSummary({
			noteIds: parsedInput.noteIds,
			maxWords: parsedInput.maxWords ?? 500,
		});

		if (result.error) {
			logger.warn("Summary generation failed", { userId: ctx.user.id, error: result.error });
			throw new Error(result.error);
		}

		if (!result.summary) {
			throw new Error("Summary generation returned no content.");
		}

		logger.info("Summary generation complete", { userId: ctx.user.id });

		return { summary: result.summary };
	});

const getSummariesSchema = z.object({
	cursor: z.string().uuid().optional(),
	subjectId: z.string().uuid().optional(),
	title: z.string().optional(),
	keywords: z.array(z.string()).optional(),
});

export const getSummaries = authActionClient
	.inputSchema(getSummariesSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cursor, subjectId, title, keywords } = parsedInput;

		const summaries = await prisma.summary
			.findMany({
				where: {
					userId: ctx.user.id,
					...(subjectId && { subjectId }),
					...(title && { title: { contains: title, mode: "insensitive" } }),
					...(keywords && keywords.length > 0 && { keywords: { hasSome: keywords } }),
				},
				orderBy: { id: "desc" },
				take: 20,
				...(cursor && { skip: 1, cursor: { id: cursor } }),
			})
			.catch((error) => {
				throw new DbError("Failed to fetch summaries", error);
			});

		const nextCursor = summaries.length === 20 ? summaries[summaries.length - 1].id : null;

		return { summaries, nextCursor };
	});
