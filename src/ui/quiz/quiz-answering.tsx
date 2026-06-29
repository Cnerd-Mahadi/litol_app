"use client"

import { useState } from "react"
import { Icons } from "@/components/ui/icons"

const F_COLOR = "#fbbf24"

export type QuizQuestion = { question: string; options: string[]; answer: string }

export function QuizAnswering({ label, questions, onFinish }: {
  label: string
  questions: QuizQuestion[]
  onFinish: (answers: Record<number, number>) => void
}) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [picked, setPicked] = useState<number | null>(null)
  const q = questions[idx]
  const progress = (idx / questions.length) * 100

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    setAnswers((a) => ({ ...a, [idx]: i }))
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      onFinish({ ...answers, [idx]: picked! })
    } else {
      setIdx(idx + 1)
      setPicked(null)
    }
  }

  const optionStyle = (i: number) => {
    const isCorrect = q.options[i] === q.answer
    const isPicked = picked === i
    if (picked === null) return { borderColor: "var(--line)" }
    if (isCorrect) return { borderColor: "#34d39980", background: "#34d39910" }
    if (isPicked) return { borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.1)" }
    return { borderColor: "var(--line)", opacity: 0.5 }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-[.18em] text-ink-500 whitespace-nowrap">
          Question {idx + 1} <span className="text-ink-700">/ {questions.length}</span>
        </span>
        <span className="font-mono text-[11px] text-ink-600 truncate max-w-[200px]">{label}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden mb-7" style={{ background: "var(--fill3)" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: F_COLOR }} />
      </div>

      <div className="rounded-2xl border p-7" style={{ background: "var(--card-bg)", borderColor: "var(--line)" }} key={idx}>
        <div className="animate-fade-up">
          <h2 className="text-[20px] font-semibold text-ink-100 leading-snug">{q.question}</h2>
          <div className="mt-6 space-y-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = q.options[i] === q.answer
              const isPicked = picked === i
              return (
                <button key={i} onClick={() => choose(i)} disabled={picked !== null}
                  className="w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all text-[14px] text-ink-200 hover:bg-fill2 disabled:hover:bg-transparent"
                  style={optionStyle(i)}>
                  <span className="h-7 w-7 shrink-0 grid place-items-center rounded-lg border font-mono text-[12px] transition"
                    style={picked !== null && isCorrect
                      ? { borderColor: "#34d39950", background: "#34d39920", color: "#34d399" }
                      : picked !== null && isPicked
                        ? { borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.2)", color: "#fca5a5" }
                        : { borderColor: "var(--line)", color: "var(--t5)" }}>
                    {picked !== null && isCorrect
                      ? <Icons.check size={14} />
                      : picked !== null && isPicked
                        ? <Icons.x size={13} />
                        : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>

          {picked !== null && (
            <div className="mt-5 p-4 rounded-xl border animate-fade-up"
              style={{ background: "var(--fill1)", borderColor: "var(--line)" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: q.options[picked] === q.answer ? "#34d399" : "#fca5a5" }}>
                  {q.options[picked] === q.answer ? <Icons.check size={15} /> : <Icons.x size={14} />}
                </span>
                <span className="text-[13px] font-semibold text-ink-200">
                  {q.options[picked] === q.answer ? "Correct" : `Not quite — answer: ${q.answer}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button onClick={next} disabled={picked === null}
          className="inline-flex items-center gap-2 h-12 px-5 rounded-xl text-[15px] font-medium text-white transition disabled:opacity-40"
          style={{ background: "#8b5cf6", boxShadow: "0 8px 24px -8px rgba(139,92,246,.6)" }}>
          {idx + 1 >= questions.length ? "See results" : "Next question"}
          <Icons.arrowR size={16} />
        </button>
      </div>
    </div>
  )
}
