"use server";

import { waitUntil } from "@vercel/functions";
import { embedTexts, ingestNoteChunks } from "../lib/ai/ingestion";
import { diffNoteCues, suggestCue, syncCues } from "../services/note";
import { authActionClient } from "../safe-action";
import { prisma } from "../prisma";
import { AppError, DbError } from "../errors";
import { logger } from "../logger";
import { createNoteSchema, suggestCueSchema, getNotesSchema, getNoteByIdSchema, updateNoteSchema, deleteNoteSchema } from "../schemas/note";

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

export const updateNote = authActionClient
	.inputSchema(updateNoteSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, cues, ...noteData } = parsedInput;

		const existing = await prisma.note
			.findFirst({
				where: { id, userId: ctx.user.id },
				select: {
					id: true,
					cues: { select: { id: true, cue: true, details: true } },
				},
			})
			.catch((error) => {
				throw new DbError("Failed to fetch note", error);
			});

		if (!existing) throw new AppError("Note not found");

		const diff = diffNoteCues(cues, existing.cues);

		const changed = [...diff.toCreate, ...diff.toUpdate];
		const embeddings = changed.length
			? await embedTexts(changed.map((c) => `${c.cue}\n${c.details}`))
			: [];

		await prisma
			.$transaction(async (tx) => {
				await tx.note.update({ where: { id }, data: noteData });
				await syncCues(tx, id, diff, embeddings);
			})
			.catch((error) => {
				throw new DbError("Failed to update note", error);
			});

		logger.info("Note updated", {
			noteId: id,
			created: diff.toCreate.length,
			updated: diff.toUpdate.length,
			deleted: diff.toDeleteIds.length,
		});

		return { noteId: id };
	});

export const deleteNote = authActionClient
	.inputSchema(deleteNoteSchema)
	.action(async ({ parsedInput, ctx }) => {
		const note = await prisma.note
			.findFirst({
				where: { id: parsedInput.id, userId: ctx.user.id },
				select: { id: true },
			})
			.catch((error) => {
				throw new DbError("Failed to fetch note", error);
			});

		if (!note) throw new AppError("Note not found");

		await prisma.note
			.delete({ where: { id: note.id } })
			.catch((error) => {
				throw new DbError("Failed to delete note", error);
			});

		logger.info("Note deleted", { noteId: note.id });

		return { noteId: note.id };
	});

export const suggestCueAction = authActionClient
	.inputSchema(suggestCueSchema)
	.action(async ({ parsedInput }) => {
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

export const getReviewNotes = authActionClient
	.action(async ({ ctx }) => {
		const notes = await prisma.note
			.findMany({
				where: { userId: ctx.user.id, cues: { some: {} } },
				include: { cues: true },
				orderBy: { id: "desc" },
				take: 4,
			})
			.catch((error) => {
				throw new DbError("Failed to fetch review notes", error);
			});

		return { notes };
	});
