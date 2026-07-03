import { notFound } from "next/navigation"
import { getNoteById } from "@/actions/note"
import { NoteReader } from "@/ui/note/note-reader"
import type { NoteItem } from "@/ui/note/note-reader"

export const dynamic = "force-dynamic"

export default async function NoteDetailPage({ params }: { params: { noteId: string } }) {
  const result = await getNoteById({ id: params.noteId })

  if (result?.serverError) throw new Error(result.serverError)
  if (!result?.data?.note) notFound()

  const note = result.data.note as NoteItem

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
      <NoteReader note={note} />
    </div>
  )
}
