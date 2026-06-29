import { DbError } from "../../errors";
import { prisma } from "../../prisma";

type ChunkRow = {
  id: string;
  content: string;
  noteId: string;
  cueId: string;
};

type VectorChunkRaw = ChunkRow & { distance: number };

const DISTANCE_THRESHOLD = 0.5;

function fuseAndRank(
  fulltextChunks: ChunkRow[],
  vectorChunks: VectorChunkRaw[]
): ChunkRow[] {
  const seen = new Set<string>();
  const result: ChunkRow[] = [];

  for (const chunk of fulltextChunks) {
    seen.add(chunk.id);
    result.push(chunk);
  }

  for (const chunk of vectorChunks) {
    if (chunk.distance <= DISTANCE_THRESHOLD && !seen.has(chunk.id)) {
      seen.add(chunk.id);
      result.push(chunk);
    }
  }

  return result;
}

export async function retrieveChunks({
  noteIds,
  keywords,
  queryEmbedding,
}: {
  noteIds: string[];
  keywords: string[];
  queryEmbedding: number[];
}): Promise<ChunkRow[]> {
  const vectorStr = `[${queryEmbedding.join(",")}]`;
  const keywordQuery = keywords.join(" ");

  const [fulltextChunks, vectorChunks] = await Promise.all([
    prisma.$queryRaw<ChunkRow[]>`
      SELECT id, content, "noteId", "cueId"
      FROM "chunk"
      WHERE "noteId" = ANY(${noteIds}::uuid[])
      AND to_tsvector('english', content) @@ plainto_tsquery('english', ${keywordQuery})
      LIMIT 20
    `.catch((error) => { throw new DbError("Fulltext chunk retrieval failed", error) }),
    prisma.$queryRaw<VectorChunkRaw[]>`
      SELECT id, content, "noteId", "cueId",
        embedding <=> ${vectorStr}::vector AS distance
      FROM "chunk"
      WHERE "noteId" = ANY(${noteIds}::uuid[])
      ORDER BY distance ASC
      LIMIT 20
    `.catch((error) => { throw new DbError("Vector chunk retrieval failed", error) }),
  ]);

  return fuseAndRank(fulltextChunks, vectorChunks);
}
