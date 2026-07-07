"use client"

import useSWR from "swr"
import { getNoteById } from "@/actions/note"
import type { NoteItem } from "@/ui/note/note-reader"

export function useNote(id: string) {
  return useSWR<NoteItem | null>(["note", id], async () => {
    const res = await getNoteById({ id })
    if (res?.serverError) throw new Error(res.serverError)
    return (res?.data?.note as NoteItem | undefined) ?? null
  })
}
