"use client"

import { Icons } from "@/components/ui/icons"
import { useDashboard } from "@/lib/swr/use-dashboard"

const STATS = [
  { key: "noteCount",     label: "Notes",        Icon: Icons.doc,      color: "#38bdf8" },
  { key: "summaryCount",  label: "Summaries",    Icon: Icons.sparkles, color: "#a78bfa" },
  { key: "subjectCount",  label: "Subjects",     Icon: Icons.chat,     color: "#34d399" },
  { key: "quizzesTaken",  label: "Quizzes taken", Icon: Icons.quiz,    color: "#fbbf24" },
] as const

function StatSkeleton() {
  return <div className="rounded-2xl h-[110px] shimmer bg-fill2" />
}

export function DashboardStats() {
  const { data, isLoading } = useDashboard()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading
        ? STATS.map((s) => <StatSkeleton key={s.key} />)
        : STATS.map(({ key, label, Icon, color }) => (
          <div key={key} className="rounded-2xl p-5 border"
            style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
            <div className="grid place-items-center rounded-xl mb-4"
              style={{ width: 38, height: 38, background: color + "14", border: `1px solid ${color}2e`, color }}>
              <Icon size={18} />
            </div>
            <div className="text-[30px] font-semibold tracking-tight text-ink-100 tabular-nums leading-none">
              {data?.[key] ?? 0}
            </div>
            <div className="text-[13px] text-ink-500 mt-1.5">{label}</div>
          </div>
        ))}
    </div>
  )
}
