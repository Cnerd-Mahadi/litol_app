"use server";

import { authActionClient } from "../safe-action";
import { generateQuiz } from "../services/quiz";
import { logger } from "../logger";
import { prisma } from "../prisma";
import { generateQuizSchema } from "../schemas/quiz";

export const generateQuizAction = authActionClient
  .inputSchema(generateQuizSchema)
  .action(async ({ parsedInput, ctx }) => {
    logger.info("Quiz generation started", {
      userId: ctx.user.id,
      noteIds: parsedInput.noteIds,
      numberOfQuizzes: parsedInput.numberOfQuizzes,
    });

    const quizzes = await generateQuiz(parsedInput);

    await prisma.quizAttempt.create({
      data: { userId: ctx.user.id },
    });

    logger.info("Quiz generation complete", {
      userId: ctx.user.id,
      count: quizzes.length,
    });

    return { quizzes };
  });
