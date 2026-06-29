"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { useNotes } from "@/lib/swr/use-notes"
import { useSubjects } from "@/lib/swr/use-subjects"
import type { NoteListItem } from "@/lib/swr/use-notes"

const F_COLOR = "#38bdf8"

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function NoteCard({ note, subjectName }: { note: NoteListItem; subjectName: string }) {
  return (
    <Link href={`/note/${note.id}`}
      className="rounded-2xl border p-5 group flex items-center gap-4 transition hover:border-line2"
      style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
      <div className="h-12 w-12 shrink-0 grid place-items-center rounded-xl border"
        style={{ background: "var(--fill1)", borderColor: "var(--line)", color: F_COLOR }}>
        <Icons.doc size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-semibold text-ink-100 truncate group-hover:text-accentFg">{note.title}</div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="inline-flex items-center h-6 px-2.5 rounded-md text-[11px] font-medium font-mono uppercase tracking-wide whitespace-nowrap"
            style={{ background: F_COLOR + "1a", color: F_COLOR, border: `1px solid ${F_COLOR}33` }}>
            {subjectName}
          </span>
          <span className="font-mono text-[11px] text-ink-600">{fmtDate(note.createdAt)}</span>
          {note._count.cues > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-ink-500">
              <Icons.chat size={12} />{note._count.cues} cues
            </span>
          )}
        </div>
      </div>
      <Icons.arrowR size={16} className="text-ink-700 group-hover:text-ink-400 transition shrink-0" />
    </Link>
  )
}

function NoteSkeleton() {
  return (
    <div className="rounded-2xl border p-5 flex items-center gap-4" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
      <div className="h-12 w-12 shrink-0 rounded-xl shimmer bg-fill2" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 rounded-md shimmer bg-fill2" />
        <div className="h-3 w-1/3 rounded-md shimmer bg-fill2" />
      </div>
    </div>
  )
}

export function NotesGallery() {
  const { data, isLoading } = useNotes()
  const { data: subjectsData } = useSubjects()
  const notes = data?.notes ?? []
  const subjects = subjectsData?.subjects ?? []

  const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name ?? id.slice(0, 8)

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {isLoading && [1, 2, 3, 4].map((i) => <NoteSkeleton key={i} />)}
      {!isLoading && notes.length === 0 && (
        <div className="col-span-2 py-16 text-center text-[14px] text-ink-500">
          No notes yet — create one above.
        </div>
      )}
      {!isLoading && notes.map((n) => (
        <NoteCard key={n.id} note={n} subjectName={subjectName(n.subjectId)} />
      ))}
    </div>
  )
}
