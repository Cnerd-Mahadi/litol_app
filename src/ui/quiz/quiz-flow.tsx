"use client"

import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { useToast } from "@/hooks/use-toast"
import { generateQuizAction } from "@/actions/quiz"
import { QuizInput, type GenerateParams } from "./quiz-input"
import { QuizGenerating } from "./quiz-generating"
import { QuizAnswering, type QuizQuestion } from "./quiz-answering"
import { QuizResults } from "./quiz-results"

type QuizState = "input" | "generating" | "answering" | "results"

export function QuizFlow() {
  const { toast } = useToast()
  const [quizState, setQuizState] = useState<QuizState>("input")
  const [label, setLabel] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const { execute: execGenerate } = useAction(generateQuizAction, {
    onSuccess: ({ data }) => {
      const qs = (data?.quizzes ?? []) as QuizQuestion[]
      if (qs.length === 0) {
        toast({ title: "No questions generated", description: "Try different notes or a more specific topic.", variant: "destructive" })
        setQuizState("input")
        return
      }
      setQuestions(qs)
      setQuizState("answering")
    },
    onError: ({ error: e }) => {
      toast({ title: e.serverError, variant: "destructive" })
      setQuizState("input")
    },
  })

  const handleGenerate = (params: GenerateParams) => {
    setLabel(params.label)
    setQuizState("generating")
    execGenerate({
      noteIds: params.noteIds,
      subjectId: params.subjectId,
      numberOfQuizzes: params.numberOfQuizzes,
      query: params.query,
    })
  }

  const handleFinish = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers)
    setQuizState("results")
  }

  if (quizState === "generating") return <QuizGenerating label={label} />
  if (quizState === "answering") return (
    <QuizAnswering label={label} questions={questions} onFinish={handleFinish} />
  )
  if (quizState === "results") return (
    <QuizResults
      label={label}
      questions={questions}
      answers={answers}
      onRetry={() => { setAnswers({}); setQuizState("answering") }}
      onNew={() => setQuizState("input")}
    />
  )

  return <QuizInput onGenerate={handleGenerate} isPending={false} />
}
