import { generateText, Output } from "ai";
import { z } from "zod";
import { llm } from "../lib/ai/config";
import { generateSummaryPrompt } from "../lib/ai/prompts";
import { prisma } from "../prisma";
import { logger } from "../logger";

const inputSchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  maxWords: z.number().int().min(100).max(2000).default(500),
});

const summaryOutputSchema = z.object({
  title: z.string(),
  keywords: z.array(z.string()),
  content: z.string(),
});

export type GeneratedSummary = z.infer<typeof summaryOutputSchema>;
export type SummaryResult = { summary?: GeneratedSummary; error?: string };

export async function generateSummary(
  input: z.infer<typeof inputSchema>
): Promise<SummaryResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { noteIds, maxWords } = parsed.data;

  const notes = await prisma.note.findMany({
    where: { id: { in: noteIds } },
    include: { cues: { select: { cue: true, details: true } } },
  });

  if (!notes.length) {
    return { error: "No notes found for the provided IDs." };
  }

  logger.info("Generating summary", { noteIds, maxWords });

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: summaryOutputSchema }),
    prompt: generateSummaryPrompt(
      notes.map((n) => ({ title: n.title, cues: n.cues })),
      maxWords
    ),
  });

  return { summary: output };
}
