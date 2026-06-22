import { prisma } from "../../prisma";

type ChunkRow = {
  id: string;
  content: string;
  noteId: string;
  cueId: string;
};

export async function retrieveChunks({
  noteIds,
  cleanedQuery,
  queryEmbedding,
}: {
  noteIds: string[];
  cleanedQuery: string;
  queryEmbedding: number[];
}): Promise<ChunkRow[]> {
  const vectorStr = `[${queryEmbedding.join(",")}]`;

  const [deterministicChunks, fulltextChunks, vectorChunks] = await Promise.all([
    prisma.$queryRaw<ChunkRow[]>`
      SELECT id, content, "noteId", "cueId" FROM "chunk"
      WHERE "noteId" = ANY(${noteIds}::uuid[])
      LIMIT 10
    `,
    prisma.$queryRaw<ChunkRow[]>`
      SELECT id, content, "noteId", "cueId" FROM "chunk"
      WHERE "noteId" = ANY(${noteIds}::uuid[])
      AND to_tsvector('english', content) @@ plainto_tsquery('english', ${cleanedQuery})
      LIMIT 10
    `,
    prisma.$queryRaw<ChunkRow[]>`
      SELECT id, content, "noteId", "cueId" FROM "chunk"
      WHERE "noteId" = ANY(${noteIds}::uuid[])
      ORDER BY embedding <=> ${vectorStr}::vector
      LIMIT 10
    `,
  ]);

  const seen = new Set<string>();
  return [...deterministicChunks, ...fulltextChunks, ...vectorChunks].filter((chunk) => {
    if (seen.has(chunk.id)) return false;
    seen.add(chunk.id);
    return true;
  });
}
