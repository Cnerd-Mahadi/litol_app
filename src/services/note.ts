import { generateText, Output } from "ai";
import { z } from "zod";
import { Prisma } from "../generated/prisma/client";
import { llm } from "../lib/ai/config";
import { writeChunk } from "../lib/ai/ingestion";
import { suggestCuePrompt } from "../lib/ai/prompts";

type IncomingCue = { id?: string; cue: string; details: string };
type ExistingCue = { id: string; cue: string; details: string };

export type CueDiff = {
  toCreate: { cue: string; details: string }[];
  toUpdate: { id: string; cue: string; details: string }[];
  toDeleteIds: string[];
};

export function diffNoteCues(
  incoming: IncomingCue[],
  existing: ExistingCue[]
): CueDiff {
  const existingById = new Map(existing.map((c) => [c.id, c]));
  const incomingIds = new Set(
    incoming.filter((c) => c.id).map((c) => c.id as string)
  );

  const toCreate: { cue: string; details: string }[] = [];
  const toUpdate: { id: string; cue: string; details: string }[] = [];

  for (const cue of incoming) {
    const prev = cue.id ? existingById.get(cue.id) : undefined;

    if (!prev) {
      toCreate.push({ cue: cue.cue, details: cue.details });
      continue;
    }

    if (prev.cue !== cue.cue || prev.details !== cue.details) {
      toUpdate.push({ id: cue.id as string, cue: cue.cue, details: cue.details });
    }
  }

  const toDeleteIds = existing
    .filter((c) => !incomingIds.has(c.id))
    .map((c) => c.id);

  return { toCreate, toUpdate, toDeleteIds };
}

export async function syncCues(
  tx: Prisma.TransactionClient,
  noteId: string,
  { toCreate, toUpdate, toDeleteIds }: CueDiff,
  embeddings: number[][]
): Promise<void> {
  if (toDeleteIds.length > 0) {
    await tx.cue.deleteMany({ where: { id: { in: toDeleteIds }, noteId } });
  }

  for (let i = 0; i < toCreate.length; i++) {
    const c = toCreate[i];
    const cue = await tx.cue.create({
      data: { noteId, cue: c.cue, details: c.details },
      select: { id: true },
    });
    await writeChunk(tx, "insert", {
      noteId,
      cueId: cue.id,
      cue: c.cue,
      details: c.details,
      embedding: embeddings[i],
    });
  }

  for (let i = 0; i < toUpdate.length; i++) {
    const c = toUpdate[i];
    await tx.cue.update({
      where: { id: c.id },
      data: { cue: c.cue, details: c.details },
    });
    await writeChunk(tx, "update", {
      noteId,
      cueId: c.id,
      cue: c.cue,
      details: c.details,
      embedding: embeddings[toCreate.length + i],
    });
  }
}

export async function suggestCue(detail: string): Promise<{ cue: string } | { error: string }> {
  const parsed = z.string().min(1, "Note detail required").safeParse(detail);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: z.object({ cue: z.string() }) }),
    prompt: suggestCuePrompt(parsed.data),
  });

  return { cue: output.cue };
}
