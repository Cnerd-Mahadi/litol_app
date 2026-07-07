import { z } from "zod"

export const generateQuizSchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  subjectId: z.string().uuid(),
  numberOfQuizzes: z.number().int().min(1).max(20),
  query: z.string().min(1),
})

export const submitQuizResultSchema = z.object({
  attemptId: z.string().uuid(),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
})

export type GenerateQuizInput = z.infer<typeof generateQuizSchema>
export type SubmitQuizResultInput = z.infer<typeof submitQuizResultSchema>
