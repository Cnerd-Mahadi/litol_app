import { embed, generateText, Output } from "ai";
import { z } from "zod";
import { llm, embedder } from "../lib/ai/config";
import { cleanQueryPrompt, generateQuizPrompt } from "../lib/ai/prompts";
import { retrieveChunks } from "../lib/ai/retrieval";

const inputSchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  subjectId: z.string().uuid(),
  numberOfQuizzes: z.number().int().min(1).max(20),
  query: z.string().min(1),
});

const quizSchema = z.object({
  quizzes: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      answer: z.string(),
    })
  ),
});

export type Quiz = z.infer<typeof quizSchema>["quizzes"][number];

export type QuizResult = { quizzes?: Quiz[]; error?: string };

export async function generateQuiz(
  input: z.infer<typeof inputSchema>
): Promise<QuizResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { noteIds, numberOfQuizzes, query } = parsed.data;

  const { output: cleanedOutput } = await generateText({
    model: llm,
    output: Output.object({ schema: z.object({ query: z.string() }) }),
    prompt: cleanQueryPrompt(query),
  });

  const { embedding: queryEmbedding } = await embed({
    model: embedder,
    value: cleanedOutput.query,
  });

  const chunks = await retrieveChunks({
    noteIds,
    cleanedQuery: cleanedOutput.query,
    queryEmbedding,
  });

  if (!chunks.length) {
    return { error: "No relevant content found for the given notes and query." };
  }

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: quizSchema }),
    prompt: generateQuizPrompt(
      chunks.map((c) => c.content),
      numberOfQuizzes
    ),
  });

  return { quizzes: output.quizzes };
}
