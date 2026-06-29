"use client"

import { Icons } from "@/components/ui/icons"
import { useNotes } from "@/lib/swr/use-notes"
import type { NoteListItem } from "@/lib/swr/use-notes"

const F_COLOR = "#a78bfa"

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function NotesPicker({ selectedIds, onToggle }: {
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  const { data, isLoading } = useNotes()
  const notes: NoteListItem[] = data?.notes ?? []

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-xl shimmer bg-fill2" />)}
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="py-8 text-center text-[13px] text-ink-500">
        No notes yet — create some on the Notes page first.
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-72 overflow-auto">
      {notes.map((n) => {
        const sel = selectedIds.includes(n.id)
        return (
          <button key={n.id} onClick={() => onToggle(n.id)}
            className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition"
            style={sel
              ? { background: F_COLOR + "10", borderColor: F_COLOR + "50" }
              : { background: "var(--fill1)", borderColor: "var(--line)" }}>
            <span className="h-5 w-5 shrink-0 grid place-items-center rounded-md border transition"
              style={sel
                ? { background: F_COLOR + "25", borderColor: F_COLOR + "66", color: F_COLOR }
                : { borderColor: "var(--line)" }}>
              {sel && <Icons.check size={12} />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-medium text-ink-200 truncate">{n.title}</div>
              <div className="font-mono text-[10px] text-ink-600 uppercase tracking-wide mt-0.5">
                {n._count.cues} cues · {fmtDate(n.createdAt)}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
