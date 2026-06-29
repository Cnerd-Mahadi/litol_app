"use client"

import { useState, useEffect } from "react"
import { Icons } from "@/components/ui/icons"
import type { QuizQuestion } from "./quiz-answering"

const F_COLOR = "#fbbf24"

export function QuizResults({ label, questions, answers, onRetry, onNew }: {
  label: string
  questions: QuizQuestion[]
  answers: Record<number, number>
  onRetry: () => void
  onNew: () => void
}) {
  const correct = questions.filter((q, i) => q.options[answers[i]] === q.answer).length
  const pct = Math.round((correct / questions.length) * 100)
  const [dash, setDash] = useState(0)
  const verdict = pct >= 80 ? "Excellent recall" : pct >= 60 ? "Solid — review the misses" : "Worth another pass"
  const R = 52
  const C = 2 * Math.PI * R

  useEffect(() => {
    const t = setTimeout(() => setDash(pct), 200)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="rounded-2xl border p-8 text-center overflow-hidden relative"
        style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: F_COLOR + "22" }} />
        <div className="relative">
          <div className="font-mono text-[11px] uppercase tracking-[.2em] text-ink-600 mb-5">
            Quiz complete · {label}
          </div>
          <div className="relative mx-auto h-32 w-32">
            <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="9" />
              <circle cx="60" cy="60" r={R} fill="none" stroke={F_COLOR} strokeWidth="9" strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (C * dash) / 100}
                style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }} />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div>
                <div className="text-[30px] font-semibold text-ink-100 tabular-nums leading-none">
                  {correct}<span className="text-ink-600 text-[20px]">/{questions.length}</span>
                </div>
                <div className="font-mono text-[12px] mt-1" style={{ color: F_COLOR }}>{pct}%</div>
              </div>
            </div>
          </div>
          <div className="text-[18px] font-semibold text-ink-100 mt-5">{verdict}</div>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={onRetry}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-medium text-ink-100 border transition hover:bg-fill2"
              style={{ background: "var(--elevated)", borderColor: "var(--line)" }}>
              <Icons.refresh size={15} />Retry quiz
            </button>
            <button onClick={onNew}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-medium text-white"
              style={{ background: "#8b5cf6" }}>
              <Icons.plus size={15} />New quiz
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <div className="font-mono text-[10px] uppercase tracking-[.18em] text-ink-600 mb-1">Breakdown</div>
        {questions.map((q, i) => {
          const ok = q.options[answers[i]] === q.answer
          return (
            <div key={i} className="rounded-2xl border p-4 flex items-start gap-3"
              style={{ background: "var(--card-bg)", borderColor: "var(--line)" }}>
              <span className="h-6 w-6 shrink-0 grid place-items-center rounded-lg mt-0.5"
                style={ok
                  ? { background: "#34d39915", color: "#34d399" }
                  : { background: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>
                {ok ? <Icons.check size={13} /> : <Icons.x size={12} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] text-ink-200 font-medium">{q.question}</div>
                <div className="text-[12.5px] text-ink-500 mt-1">
                  Answer: <span className="text-feat-map">{q.answer}</span>
                  {!ok && answers[i] != null && (
                    <span className="text-red-300/80"> · You picked {q.options[answers[i]]}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
