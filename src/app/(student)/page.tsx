import { FEATURES, FeatureKey } from "@/lib/dummy-data"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { DashboardStats } from "@/ui/dashboard/dashboard-stats"
import { DashboardRecent } from "@/ui/dashboard/dashboard-recent"

export const dynamic = "force-dynamic"

const ICON_MAP = {
  sparkles: Icons.sparkles,
  chat: Icons.chat,
  quiz: Icons.quiz,
  home: Icons.home,
} as const

export default function DashPage() {
  const hour = new Date().getHours()
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

  return (
    <div className="py-9 px-8 xl:px-12 max-w-[1180px] mx-auto animate-fade-up">
      {/* Greeting */}
      <div className="mb-8">
        <div className="font-mono text-[11px] uppercase tracking-[.2em] text-ink-600 mb-2">{today}</div>
        <h1 className="text-[32px] font-semibold tracking-tight text-ink-100 leading-none">{greet}.</h1>
      </div>

      {/* Stat cards */}
      <DashboardStats />

      {/* Quick actions + Recent activity */}
      <div className="grid lg:grid-cols-[1.55fr_1fr] gap-5 mt-9">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icons.bolt size={15} className="text-ink-500" />
            <h2 className="text-[13px] font-mono uppercase tracking-[.18em] text-ink-500 whitespace-nowrap">Start something</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {(["summary", "qa", "quiz"] as FeatureKey[]).map((key) => {
              const f = FEATURES[key]
              const Ico = ICON_MAP[f.icon as keyof typeof ICON_MAP]
              return (
                <Link key={key} href={f.route} className="group">
                  <div className="rounded-2xl p-5 h-full flex flex-col border transition-all hover:border-line2"
                    style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
                    <div className="flex items-center justify-between">
                      <div className="grid place-items-center rounded-xl"
                        style={{ width: 40, height: 40, background: f.color + "14", border: `1px solid ${f.color}2e`, color: f.color }}>
                        {Ico && <Ico size={19} />}
                      </div>
                      <span className="h-8 w-8 grid place-items-center rounded-lg text-ink-600 group-hover:text-ink-200 group-hover:bg-fill3 transition-all group-hover:translate-x-0.5">
                        <Icons.arrowR size={16} />
                      </span>
                    </div>
                    <div className="mt-4 text-[15px] font-semibold text-ink-100">{f.title}</div>
                    <div className="text-[13px] text-ink-500 mt-1 leading-relaxed">{f.desc}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icons.clock size={15} className="text-ink-500" />
            <h2 className="text-[13px] font-mono uppercase tracking-[.18em] text-ink-500 whitespace-nowrap">Recent activity</h2>
          </div>
          <DashboardRecent />
        </div>
      </div>
    </div>
  )
}
