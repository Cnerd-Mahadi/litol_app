import Link from "next/link"
import { Icons } from "@/components/ui/icons"

const F_COLOR = "#a78bfa"

export type SummaryItem = {
  id: string
  title: string
  description: string | null
  keywords: string[]
  content: string
  subjectId: string | null
  createdAt: Date
  updatedAt: Date
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function SummaryReader({ s }: { s: SummaryItem }) {
  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <Link href="/summary"
        className="flex items-center gap-1.5 text-[13px] text-ink-500 hover:text-ink-200 mb-5 transition whitespace-nowrap">
        <Icons.chevR size={15} className="rotate-180" /> Back to gallery
      </Link>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        <div className="h-36 grid place-items-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${F_COLOR}14, rgba(255,255,255,.02))` }}>
          <span className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-500 border rounded-md px-2 py-1"
            style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.3)" }}>
            summary
          </span>
        </div>

        <div className="p-7">
          <div className="font-mono text-[11px] text-ink-600 uppercase tracking-wider">{fmtDate(s.createdAt)}</div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink-100 mt-2 leading-tight">{s.title}</h1>

          {s.keywords.length > 0 && (
            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-600 mb-2.5">Key terms</div>
              <div className="flex flex-wrap gap-2">
                {s.keywords.map((k) => (
                  <span key={k} className="inline-flex items-center h-7 px-3 rounded-full text-[12.5px] text-ink-300 font-medium whitespace-nowrap"
                    style={{ background: "var(--elevated)", border: "1px solid var(--line)" }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7">
            <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-600 mb-4">Summary</div>
            <p className="text-[15px] text-ink-200 leading-[1.85] whitespace-pre-wrap">{s.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
