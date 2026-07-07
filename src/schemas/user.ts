import { z } from "zod"

export const createSubjectSchema = z.object({
  name: z.string().min(1),
})

export const getSubjectsSchema = z.object({
  name: z.string().optional(),
})

export const updateSubjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
})

export const deleteSubjectSchema = z.object({
  id: z.string().uuid(),
})

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>
export type GetSubjectsParams = z.infer<typeof getSubjectsSchema>
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>
export type DeleteSubjectInput = z.infer<typeof deleteSubjectSchema>
