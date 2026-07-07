import { NoteDetail } from "@/ui/note/note-detail"

export default function NoteDetailPage({ params }: { params: { noteId: string } }) {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
      <NoteDetail id={params.noteId} />
    </div>
  )
}
