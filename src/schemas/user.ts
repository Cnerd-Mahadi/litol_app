import { z } from "zod"

export const createSubjectSchema = z.object({
  name: z.string().min(1),
})

export const getSubjectsSchema = z.object({
  name: z.string().optional(),
})

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>
export type GetSubjectsParams = z.infer<typeof getSubjectsSchema>
