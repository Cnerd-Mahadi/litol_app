"use server";

import { z } from "zod";
import { authActionClient } from "../safe-action";
import { generateQuiz } from "../services/quiz";
import { logger } from "../logger";

const generateQuizSchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  subjectId: z.string().uuid(),
  numberOfQuizzes: z.number().int().min(1).max(20),
  query: z.string().min(1),
});

export const generateQuizAction = authActionClient
  .inputSchema(generateQuizSchema)
  .action(async ({ parsedInput, ctx }) => {
    logger.info("Quiz generation started", {
      userId: ctx.user.id,
      noteIds: parsedInput.noteIds,
      numberOfQuizzes: parsedInput.numberOfQuizzes,
    });

    const result = await generateQuiz(parsedInput);

    if (result.error) {
      logger.warn("Quiz generation failed", { userId: ctx.user.id, error: result.error });
      throw new Error(result.error);
    }

    if (!result.quizzes) {
      throw new Error("Quiz generation returned no quizzes.");
    }

    logger.info("Quiz generation complete", {
      userId: ctx.user.id,
      count: result.quizzes.length,
    });

    return { quizzes: result.quizzes };
  });
