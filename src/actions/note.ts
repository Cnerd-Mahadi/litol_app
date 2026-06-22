"use server";

import { waitUntil } from "@vercel/functions";
import { z } from "zod";
import { ingestNoteChunks } from "../lib/ai/ingestion";
import { authActionClient } from "../safe-action";
import { prisma } from "../prisma";
import { DbError } from "../errors";
import { logger } from "../logger";

const createNoteSchema = z.object({
	title: z.string().min(1),
	subjectId: z.string().uuid(),
	description: z.string().min(1).optional(),
	keywords: z.array(z.string()),
	cues: z.array(
		z.object({
			cue: z.string().min(1),
			details: z.string().min(1),
		})
	),
});

export const createNote = authActionClient
	.inputSchema(createNoteSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cues, ...noteData } = parsedInput;

		const note = await prisma.note
			.create({
				data: {
					...noteData,
					userId: ctx.user.id,
					cues: { create: cues },
				},
				include: { cues: true },
			})
			.catch((error) => {
				throw new DbError("Failed to create note", error);
			});

		logger.info("Note created", { noteId: note.id });

		waitUntil(ingestNoteChunks({ noteId: note.id, cues: note.cues }));

		return { message: "Note created" };
	});

const suggestCueSchema = z.object({
	detail: z.string().min(1),
});

export const suggestCueAction = authActionClient
	.inputSchema(suggestCueSchema)
	.action(async ({ parsedInput }) => {
		const { suggestCue } = await import("../services/note");
		const result = await suggestCue(parsedInput.detail);
		if ("error" in result) throw new Error(result.error);
		return result;
	});

const getNotesSchema = z.object({
	cursor: z.string().uuid().optional(),
	subjectId: z.string().uuid().optional(),
	title: z.string().optional(),
	keywords: z.array(z.string()).optional(),
});

export const getNotes = authActionClient
	.inputSchema(getNotesSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cursor, subjectId, title, keywords } = parsedInput;

		const notes = await prisma.note
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
				throw new DbError("Failed to fetch notes", error);
			});

		const nextCursor = notes.length === 20 ? notes[notes.length - 1].id : null;

		return { notes, nextCursor };
	});
