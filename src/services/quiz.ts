import { embed, generateText, Output } from "ai";
import { z } from "zod";
import { llm, embedder } from "../lib/ai/config";
import { cleanQueryPrompt, generateQuizPrompt } from "../lib/ai/prompts";
import { retrieveChunks } from "../lib/ai/retrieval";
import { logger } from "../logger";

const TOP_K = 20;

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
      sourceCueId: z.string(),
    })
  ),
});

export type Quiz = Pick<
  z.infer<typeof quizSchema>["quizzes"][number],
  "question" | "options" | "answer"
>;

export type QuizResult = { quizzes?: Quiz[]; error?: string };

export async function generateQuiz(
  input: z.infer<typeof inputSchema>
): Promise<QuizResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { noteIds, numberOfQuizzes, query } = parsed.data;

  logger.info("Quiz generation started", { noteIds, numberOfQuizzes, query });

  const { output: cleanedOutput } = await generateText({
    model: llm,
    output: Output.object({
      schema: z.object({
        keywords: z.array(z.string()),
        semanticQuery: z.string(),
      }),
    }),
    prompt: cleanQueryPrompt(query),
  });

  logger.info("Query cleaned", { keywords: cleanedOutput.keywords, semanticQuery: cleanedOutput.semanticQuery });

  const { embedding: queryEmbedding } = await embed({
    model: embedder,
    value: cleanedOutput.semanticQuery,
  });

  logger.info("Query embedded");

  const chunks = await retrieveChunks({
    noteIds,
    keywords: cleanedOutput.keywords,
    queryEmbedding,
  });

  logger.info("Chunks retrieved", { count: chunks.length });

  if (chunks.length < numberOfQuizzes) {
    logger.warn("Not enough chunks", { chunks: chunks.length, requested: numberOfQuizzes });
    return { error: "Not enough content to generate the requested number of questions." };
  }

  const topChunks = chunks.slice(0, TOP_K);

  logger.info("Generating quizzes", { topChunks: topChunks.length, numberOfQuizzes });

  const { output } = await generateText({
    model: llm,
    output: Output.object({ schema: quizSchema }),
    prompt: generateQuizPrompt(
      topChunks.map((c) => ({ cueId: c.cueId, content: c.content })),
      numberOfQuizzes
    ),
  });

  const validCueIds = new Set(topChunks.map((c) => c.cueId));
  const groundedQuizzes = output.quizzes
    .filter((q) => validCueIds.has(q.sourceCueId))
    .map(({ question, options, answer }) => ({ question, options, answer }));

  logger.info("Quiz grounding complete", { generated: output.quizzes.length, grounded: groundedQuizzes.length });

  return { quizzes: groundedQuizzes };
}
