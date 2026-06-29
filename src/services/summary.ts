import { generateText, Output } from "ai";
import { z } from "zod";
import { llm } from "../lib/ai/config";
import { generateSummaryPrompt } from "../lib/ai/prompts";
import { prisma } from "../prisma";
import { logger } from "../logger";
import { AppError, DbError } from "../errors";

const summaryOutputSchema = z.object({
  title: z.string(),
  keywords: z.array(z.string()),
  content: z.string(),
});

export type GeneratedSummary = z.infer<typeof summaryOutputSchema>;

export async function generateSummary(input: {
  noteIds: string[];
  maxWords: number;
}): Promise<GeneratedSummary> {
  const notes = await prisma.note
    .findMany({
      where: { id: { in: input.noteIds } },
      include: { cues: { select: { cue: true, details: true } } },
    })
    .catch((error) => {
      throw new DbError("Failed to fetch notes for summary", error);
    });

  if (!notes.length) {
    throw new AppError("No notes found for the provided IDs.");
  }

  logger.info("Generating summary", { noteIds: input.noteIds, maxWords: input.maxWords });

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: summaryOutputSchema }),
    prompt: generateSummaryPrompt(
      notes.map((n) => ({ title: n.title, cues: n.cues })),
      input.maxWords
    ),
  });

  return output;
}
