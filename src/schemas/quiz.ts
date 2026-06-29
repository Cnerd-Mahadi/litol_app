import { z } from "zod"

export const generateQuizSchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  subjectId: z.string().uuid(),
  numberOfQuizzes: z.number().int().min(1).max(20),
  query: z.string().min(1),
})

export type GenerateQuizInput = z.infer<typeof generateQuizSchema>
