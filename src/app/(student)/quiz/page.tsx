import { Icons } from "@/components/ui/icons"
import { QuizFlow } from "@/ui/quiz/quiz-flow"

const F_COLOR = "#fbbf24"

export const dynamic = "force-dynamic"

export default function QuizPage() {
  return (
    <div className="py-9 px-8 xl:px-12 max-w-[1180px] mx-auto">
      <div className="flex items-start gap-3.5 mb-7">
        <div className="grid place-items-center rounded-xl shrink-0"
          style={{ width: 44, height: 44, background: F_COLOR + "14", border: `1px solid ${F_COLOR}2e`, color: F_COLOR }}>
          <Icons.quiz size={20} />
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[.2em] mb-1.5 whitespace-nowrap" style={{ color: F_COLOR }}>
            AI Quiz
          </div>
          <h1 className="text-[26px] font-semibold tracking-tight text-ink-100 leading-none">Quiz</h1>
          <p className="text-[14px] text-ink-400 mt-2 max-w-xl leading-relaxed">
            Pick a subject, select notes, set a focus — AI generates questions grounded in your material.
          </p>
        </div>
      </div>
      <QuizFlow />
    </div>
  )
}
