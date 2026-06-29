import { z } from "zod"

export const createNoteSchema = z.object({
  title: z.string().min(1),
  subjectId: z.string().uuid(),
  description: z.string().min(1).optional(),
  keywords: z.array(z.string()),
  cues: z.array(
    z.object({
      cue: z.string().min(1),
      details: z.string().min(1),
    })
  ),
})

export const suggestCueSchema = z.object({
  detail: z.string().min(1),
})

export const getNotesSchema = z.object({
  cursor: z.string().uuid().optional(),
  title: z.string().optional(),
})

export const getNoteByIdSchema = z.object({
  id: z.string().uuid(),
})

export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type SuggestCueInput = z.infer<typeof suggestCueSchema>
export type GetNotesParams = z.infer<typeof getNotesSchema>
export type GetNoteByIdInput = z.infer<typeof getNoteByIdSchema>
