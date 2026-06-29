"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

const F_COLOR = "#38bdf8"

export type NoteCue = { id: string; cue: string; details: string; noteId: string }
export type NoteItem = {
  id: string
  title: string
  subjectId: string
  subject?: { id: string; name: string }
  description: string | null
  keywords: string[]
  createdAt: Date
  updatedAt: Date
  cues: NoteCue[]
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function CueRow({ cue, index }: { cue: NoteCue; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border overflow-hidden transition" style={{ background: "var(--fill1)", borderColor: "var(--line)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-fill2 transition">
        <span className="font-mono text-[11px] shrink-0" style={{ color: F_COLOR }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[13.5px] font-medium text-ink-200">{cue.cue}</span>
        <Icons.chevR size={14} className={cn("text-ink-600 transition-transform shrink-0", open ? "rotate-90" : "")} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: "var(--line)" }}>
          <p className="text-[13.5px] text-ink-300 leading-relaxed pl-[26px]">{cue.details}</p>
        </div>
      )}
    </div>
  )
}

export function NoteReader({ note }: { note: NoteItem }) {
  const subjectName = note.subject?.name ?? note.subjectId.slice(0, 8)

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <Link href="/note"
        className="flex items-center gap-1.5 text-[13px] text-ink-500 hover:text-ink-200 mb-5 transition whitespace-nowrap">
        <Icons.chevR size={15} className="rotate-180" /> Back to notes
      </Link>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        <div className="px-7 pt-7 pb-5 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center h-6 px-2.5 rounded-md text-[11px] font-medium font-mono uppercase tracking-wide whitespace-nowrap"
              style={{ background: F_COLOR + "1a", color: F_COLOR, border: `1px solid ${F_COLOR}33` }}>
              {subjectName}
            </span>
            <span className="font-mono text-[11px] text-ink-600">{fmtDate(note.createdAt)}</span>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-ink-100 leading-tight">{note.title}</h1>
          {note.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.keywords.map((k) => (
                <span key={k} className="inline-flex items-center h-7 px-3 rounded-full text-[12.5px] text-ink-400 font-medium whitespace-nowrap"
                  style={{ background: "var(--elevated)", border: "1px solid var(--line)" }}>
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-7 space-y-7">
          {note.description && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-600 mb-3">Notes</div>
              <p className="text-[15px] text-ink-200 leading-[1.85] whitespace-pre-wrap">{note.description}</p>
            </div>
          )}
          {note.cues.length > 0 && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-600 mb-3">
                Cues <span className="text-ink-700 normal-case font-normal">— click to reveal</span>
              </div>
              <div className="space-y-2">
                {note.cues.map((c, i) => <CueRow key={c.id} cue={c} index={i} />)}
              </div>
            </div>
          )}
          {!note.description && note.cues.length === 0 && (
            <div className="py-8 text-center text-[14px] text-ink-500">No content added to this note yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
