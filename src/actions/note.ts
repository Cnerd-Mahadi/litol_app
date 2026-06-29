"use server";

import { waitUntil } from "@vercel/functions";
import { ingestNoteChunks } from "../lib/ai/ingestion";
import { authActionClient } from "../safe-action";
import { prisma } from "../prisma";
import { DbError } from "../errors";
import { logger } from "../logger";
import { createNoteSchema, suggestCueSchema, getNotesSchema, getNoteByIdSchema } from "../schemas/note";

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

		return { noteId: note.id };
	});

export const suggestCueAction = authActionClient
	.inputSchema(suggestCueSchema)
	.action(async ({ parsedInput }) => {
		const { suggestCue } = await import("../services/note");
		const result = await suggestCue(parsedInput.detail);
		if ("error" in result) throw new Error(result.error);
		return result;
	});

export const getNotes = authActionClient
	.inputSchema(getNotesSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { cursor, title } = parsedInput;

		const notes = await prisma.note
			.findMany({
				where: {
					userId: ctx.user.id,
					...(title && { title: { contains: title, mode: "insensitive" } }),
				},
				select: {
					id: true,
					title: true,
					subjectId: true,
					keywords: true,
					createdAt: true,
					updatedAt: true,
					_count: { select: { cues: true } },
				},
				orderBy: { id: "desc" },
				take: 21,
				...(cursor && { skip: 1, cursor: { id: cursor } }),
			})
			.catch((error) => {
				throw new DbError("Failed to fetch notes", error);
			});

		const hasNextPage = notes.length === 21;
		const page = hasNextPage ? notes.slice(0, 20) : notes;
		const nextCursor = hasNextPage ? page[page.length - 1].id : null;

		return { notes: page, nextCursor };
	});

export const getNoteById = authActionClient
	.inputSchema(getNoteByIdSchema)
	.action(async ({ parsedInput, ctx }) => {
		const note = await prisma.note
			.findUnique({
				where: { id: parsedInput.id, userId: ctx.user.id },
				include: { cues: true, subject: true },
			})
			.catch((error) => {
				throw new DbError("Failed to fetch note", error);
			});

		return { note };
	});
