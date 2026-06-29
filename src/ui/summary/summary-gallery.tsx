"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { useSummaries } from "@/lib/swr/use-summaries"
import type { SummaryListItem } from "@/lib/swr/use-summaries"
const F_COLOR = "#a78bfa"

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function SummaryCard({ s }: { s: SummaryListItem }) {
  return (
    <Link href={`/summary/${s.id}`}
      className="rounded-2xl border overflow-hidden group transition-all hover:border-line2 block"
      style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
      <div className="h-28 grid place-items-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${F_COLOR}14, rgba(255,255,255,.02))` }}>
        {s.keywords.length > 0 && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center h-6 px-2.5 rounded-md text-[11px] font-medium font-mono uppercase tracking-wide whitespace-nowrap"
              style={{ background: F_COLOR + "1a", color: F_COLOR, border: `1px solid ${F_COLOR}33` }}>
              {s.keywords[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-[14px] font-semibold text-ink-100 leading-snug line-clamp-2 group-hover:text-accentFg transition">
          {s.title}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[11px] text-ink-600">{fmtDate(s.createdAt)}</span>
          <span className="flex items-center gap-1 text-[11px] text-ink-500">
            <Icons.eye size={12} />{s.keywords.length} keywords
          </span>
        </div>
      </div>
    </Link>
  )
}

function SummarySkeleton() {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
      <div className="h-28 shimmer bg-fill2" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded-md shimmer bg-fill2" />
        <div className="h-3 w-1/3 rounded-md shimmer bg-fill2" />
      </div>
    </div>
  )
}

export function SummaryGallery() {
  const { data, isLoading } = useSummaries()
  const summaries = data?.summaries ?? []

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {isLoading && [1, 2, 3].map((i) => <SummarySkeleton key={i} />)}
      {!isLoading && summaries.length === 0 && (
        <div className="col-span-3 py-16 text-center text-[14px] text-ink-500">
          No summaries yet — generate one above.
        </div>
      )}
      {!isLoading && summaries.map((s) => (
        <SummaryCard key={s.id} s={s} />
      ))}
    </div>
  )
}
