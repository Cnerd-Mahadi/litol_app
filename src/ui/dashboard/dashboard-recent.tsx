"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { useDashboard } from "@/lib/swr/use-dashboard"

function timeAgo(d: Date) {
  const diff = Date.now() - new Date(d).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return "Just now"
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days === 1) return "Yesterday"
  return `${days} days ago`
}

export function DashboardRecent() {
  const { data, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="rounded-2xl border p-2 space-y-1"
        style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[52px] rounded-xl shimmer bg-fill2" />
        ))}
      </div>
    )
  }

  const activity = data?.recentActivity ?? []

  if (activity.length === 0) {
    return (
      <div className="rounded-2xl border p-10 text-center text-[13px] text-ink-500"
        style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        No activity yet.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border p-2"
      style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
      {activity.map((a) => {
        const isNote = a.type === "note"
        const color = isNote ? "#38bdf8" : "#a78bfa"
        const href = isNote ? `/note/${a.id}` : `/summary/${a.id}`
        const Icon = isNote ? Icons.doc : Icons.sparkles
        return (
          <Link key={a.id} href={href}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-fill2 transition group">
            <div className="grid place-items-center rounded-xl shrink-0"
              style={{ width: 32, height: 32, background: color + "14", border: `1px solid ${color}2e`, color }}>
              <Icon size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-ink-300 truncate">{a.title}</div>
              <div className="font-mono text-[10.5px] text-ink-600 mt-0.5">{timeAgo(a.createdAt)}</div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 text-ink-600 transition">
              <Icons.arrowR size={14} />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
