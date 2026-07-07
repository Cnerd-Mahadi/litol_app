import { embedMany } from "ai";
import { v7 as uuidv7 } from "uuid";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../prisma";
import { logger } from "../../logger";
import { embedder } from "./config";

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: embedder,
    values: texts,
  });

  return embeddings;
}

type ChunkWrite = {
  noteId: string;
  cueId: string;
  cue: string;
  details: string;
  embedding: number[];
};

export async function writeChunk(
  client: Prisma.TransactionClient,
  mode: "insert" | "update",
  { noteId, cueId, cue, details, embedding }: ChunkWrite
): Promise<void> {
  const content = `${cue}\n${details}`;
  const vector = `[${embedding.join(",")}]`;

  if (mode === "insert") {
    await client.$executeRaw`
      INSERT INTO "chunk" (id, "noteId", "cueId", content, embedding, "createdAt", "updatedAt")
      VALUES (${uuidv7()}::uuid, ${noteId}::uuid, ${cueId}::uuid, ${content}, ${vector}::vector, NOW(), NOW())
    `;
    return;
  }

  await client.$executeRaw`
    UPDATE "chunk"
    SET content = ${content}, embedding = ${vector}::vector, "updatedAt" = NOW()
    WHERE "cueId" = ${cueId}::uuid
  `;
}

type Cue = {
  id: string;
  cue: string;
  details: string;
};

export async function ingestNoteChunks({
  noteId,
  cues,
}: {
  noteId: string;
  cues: Cue[];
}) {
  if (!cues.length) {
    logger.warn("Note ingestion skipped — no cues provided", { noteId });
    return;
  }

  logger.info("Starting note ingestion", { noteId, cueCount: cues.length });

  const embeddings = await embedTexts(cues.map((c) => `${c.cue}\n${c.details}`));

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < cues.length; i++) {
      const c = cues[i];
      await writeChunk(tx, "insert", {
        noteId,
        cueId: c.id,
        cue: c.cue,
        details: c.details,
        embedding: embeddings[i],
      });
    }
  });

  logger.info("Note ingestion complete", { noteId, cueCount: cues.length });
}
