"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

const F_COLOR = "#fbbf24"
const STEPS = ["Analyzing notes", "Drafting questions", "Writing distractors", "Finalizing quiz"]

export function QuizGenerating({ label }: { label: string }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 480)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="max-w-md mx-auto pt-10 text-center animate-fade-up">
      <div className="relative mx-auto h-20 w-20 mb-7">
        <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: F_COLOR + "55" }} />
        <div className="relative h-20 w-20 grid place-items-center rounded-2xl border"
          style={{ background: F_COLOR + "14", borderColor: F_COLOR + "40", color: F_COLOR }}>
          <Icons.quiz size={34} />
        </div>
      </div>
      <div className="text-[17px] font-semibold text-ink-100">Building your quiz</div>
      <div className="text-[13px] text-ink-500 mt-1">on <span className="text-ink-300">{label}</span></div>
      <div className="mt-7 space-y-2.5 text-left max-w-xs mx-auto">
        {STEPS.map((s, i) => (
          <div key={i} className={cn("flex items-center gap-2.5 text-[13px] transition", i <= step ? "text-ink-200" : "text-ink-700")}>
            <span className="h-5 w-5 grid place-items-center rounded-full border transition"
              style={i < step
                ? { background: F_COLOR + "25", borderColor: F_COLOR + "66", color: F_COLOR }
                : i === step
                  ? { borderColor: F_COLOR + "66" }
                  : { borderColor: "var(--line)" }}>
              {i < step
                ? <Icons.check size={12} />
                : i === step
                  ? <span className="h-2 w-2 rounded-full animate-pulse-soft" style={{ background: F_COLOR }} />
                  : <span className="h-1.5 w-1.5 rounded-full bg-ink-700" />}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
