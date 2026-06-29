import { z } from "zod"

export const createSummarySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  keywords: z.array(z.string()),
  content: z.string().min(1),
  subjectId: z.string().uuid().optional(),
  noteIds: z.array(z.string().uuid()).optional(),
})

export const generateSummarySchema = z.object({
  noteIds: z.array(z.string().uuid()).min(1),
  maxWords: z.number().int().min(100).max(2000).optional(),
})

export const getSummariesSchema = z.object({
  cursor: z.string().uuid().optional(),
  title: z.string().optional(),
})

export const getSummaryByIdSchema = z.object({
  id: z.string().uuid(),
})

export type CreateSummaryInput = z.infer<typeof createSummarySchema>
export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>
export type GetSummariesParams = z.infer<typeof getSummariesSchema>
export type GetSummaryByIdInput = z.infer<typeof getSummaryByIdSchema>
