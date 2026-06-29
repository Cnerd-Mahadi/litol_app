"use client"

import useSWR from "swr"
import { getNotes } from "@/actions/note"
import type { GetNotesParams } from "@/schemas/note"

type NotesParams = Omit<GetNotesParams, "cursor">

export type NoteListItem = {
  id: string
  title: string
  subjectId: string
  keywords: string[]
  createdAt: Date
  updatedAt: Date
  _count: { cues: number }
}

type NotesData = {
  notes: NoteListItem[]
  nextCursor: string | null
}

export function useNotes(params: NotesParams = {}) {
  return useSWR<NotesData | null>(
    "notes",
    async () => {
      const result = await getNotes(params)
      if (result?.serverError) throw new Error(result.serverError)
      return result?.data ?? null
    }
  )
}
