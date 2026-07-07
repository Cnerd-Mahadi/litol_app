"use server";

import { authActionClient } from "../safe-action";
import { generateQuiz } from "../services/quiz";
import { logger } from "../logger";
import { prisma } from "../prisma";
import { AppError, DbError } from "../errors";
import { generateQuizSchema, submitQuizResultSchema } from "../schemas/quiz";

export const generateQuizAction = authActionClient
  .inputSchema(generateQuizSchema)
  .action(async ({ parsedInput, ctx }) => {
    logger.info("Quiz generation started", {
      userId: ctx.user.id,
      noteIds: parsedInput.noteIds,
      numberOfQuizzes: parsedInput.numberOfQuizzes,
    });

    const quizzes = await generateQuiz(parsedInput);

    const attempt = await prisma.quizAttempt
      .create({
        data: { userId: ctx.user.id },
        select: { id: true },
      })
      .catch((error) => {
        throw new DbError("Failed to record quiz attempt", error);
      });

    logger.info("Quiz generation complete", {
      userId: ctx.user.id,
      count: quizzes.length,
    });

    return { quizzes, attemptId: attempt.id };
  });

export const submitQuizResult = authActionClient
  .inputSchema(submitQuizResultSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { attemptId, score, total } = parsedInput;

    const owned = await prisma.quizAttempt
      .findFirst({
        where: { id: attemptId, userId: ctx.user.id },
        select: { id: true },
      })
      .catch((error) => {
        throw new DbError("Failed to fetch quiz attempt", error);
      });

    if (!owned) throw new AppError("Quiz attempt not found");

    await prisma.quizAttempt
      .update({
        where: { id: attemptId },
        data: { score, total },
      })
      .catch((error) => {
        throw new DbError("Failed to save quiz result", error);
      });

    logger.info("Quiz result saved", { attemptId, score, total });

    return { attemptId };
  });
