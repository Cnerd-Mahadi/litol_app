"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { SubjectSelector } from "@/ui/shared/subject-selector"
import { useNotes } from "@/lib/swr/use-notes"
import type { NoteListItem } from "@/lib/swr/use-notes"

const F_COLOR = "#fbbf24"

export type GenerateParams = {
  noteIds: string[]
  subjectId: string
  numberOfQuizzes: number
  query: string
  label: string
}

export function QuizInput({ onGenerate, isPending }: {
  onGenerate: (params: GenerateParams) => void
  isPending: boolean
}) {
  const [subjectId, setSubjectId] = useState("")
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [query, setQuery] = useState("")

  const { data: notesData, isLoading: notesLoading } = useNotes()
  const allNotes: NoteListItem[] = notesData?.notes ?? []
  const notes = subjectId ? allNotes.filter((n) => n.subjectId === subjectId) : []

  const toggleNote = (id: string) =>
    setSelectedNoteIds((ids) => ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])

  const canGenerate = subjectId && selectedNoteIds.length > 0 && query.trim() && !isPending

  const generate = () => {
    if (!canGenerate) return
    const firstNote = notes.find((n) => n.id === selectedNoteIds[0])
    onGenerate({
      noteIds: selectedNoteIds,
      subjectId,
      numberOfQuizzes: count,
      query: query.trim(),
      label: firstNote?.title ?? query.trim(),
    })
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border p-6 space-y-6" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>

        {/* Subject */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">Subject</label>
          <SubjectSelector
            value={subjectId}
            onChange={(id) => { setSubjectId(id); setSelectedNoteIds([]) }}
            placeholder="Select a subject…"
          />
        </div>

        {/* Notes */}
        {subjectId && (
          <div>
            <label className="text-[12px] font-medium text-ink-400 mb-2 block">
              Notes <span className="text-ink-600">— {selectedNoteIds.length} selected</span>
            </label>
            {notesLoading && (
              <div className="space-y-2">
                {[1, 2].map((i) => <div key={i} className="h-12 rounded-xl shimmer bg-fill2" />)}
              </div>
            )}
            {!notesLoading && notes.length === 0 && (
              <div className="py-6 text-center text-[13px] text-ink-500 rounded-xl border"
                style={{ borderColor: "var(--line)", background: "var(--fill1)" }}>
                No notes for this subject yet.
              </div>
            )}
            {!notesLoading && notes.length > 0 && (
              <div className="space-y-2 max-h-52 overflow-auto">
                {notes.map((n) => {
                  const sel = selectedNoteIds.includes(n.id)
                  return (
                    <button key={n.id} onClick={() => toggleNote(n.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition"
                      style={sel
                        ? { background: F_COLOR + "10", borderColor: F_COLOR + "50" }
                        : { background: "var(--fill1)", borderColor: "var(--line)" }}>
                      <span className="h-5 w-5 shrink-0 grid place-items-center rounded-md border transition"
                        style={sel
                          ? { background: F_COLOR + "25", borderColor: F_COLOR + "66", color: F_COLOR }
                          : { borderColor: "var(--line)" }}>
                        {sel && <Icons.check size={12} />}
                      </span>
                      <span className="text-[13.5px] font-medium text-ink-200 truncate">{n.title}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Query */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2 block">
            Describe your quiz
          </label>
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. Test me on how enzymes work and why temperature matters…"
            className="w-full h-10 rounded-lg px-3.5 text-sm text-ink-100 placeholder:text-ink-600 outline-none"
            style={{ background: "var(--fill1)", border: "1px solid var(--line)" }} />
        </div>

        {/* Count */}
        <div>
          <label className="text-[12px] font-medium text-ink-400 mb-2.5 block">Questions</label>
          <div className="flex gap-2">
            {[5, 10, 15].map((n) => (
              <button key={n} onClick={() => setCount(n)}
                className={cn("flex-1 h-10 rounded-lg text-[13px] font-medium font-mono border transition",
                  count === n ? "text-accentFg" : "text-ink-400 hover:text-ink-200")}
                style={count === n
                  ? { background: F_COLOR + "14", borderColor: F_COLOR + "4d", color: F_COLOR }
                  : { borderColor: "var(--line)" }}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generate} disabled={!canGenerate}
          className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-[15px] font-medium text-white transition disabled:opacity-40 disabled:pointer-events-none"
          style={{ background: "#8b5cf6", boxShadow: "0 8px 24px -8px rgba(139,92,246,.6)" }}>
          <Icons.sparkles size={17} />Generate quiz
        </button>
      </div>
    </div>
  )
}
