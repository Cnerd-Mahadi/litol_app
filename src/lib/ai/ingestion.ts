import { embedMany } from "ai";
import { v7 as uuidv7 } from "uuid";
import { prisma } from "../../prisma";
import { logger } from "../../logger";
import { embedder } from "./config";

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

  const contents = cues.map((c) => `${c.cue}\n${c.details}`);

  const { embeddings } = await embedMany({
    model: embedder,
    values: contents,
  });

  await prisma.$transaction(
    cues.map((cue, i) => {
      const id = uuidv7();
      const vector = `[${embeddings[i].join(",")}]`;
      return prisma.$executeRaw`
        INSERT INTO "chunk" (id, "noteId", "cueId", content, embedding, "createdAt", "updatedAt")
        VALUES (${id}::uuid, ${noteId}::uuid, ${cue.id}::uuid, ${contents[i]}, ${vector}::vector, NOW(), NOW())
      `;
    })
  );

  logger.info("Note ingestion complete", { noteId, cueCount: cues.length });
}
