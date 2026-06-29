"use client"

import useSWR from "swr"
import { getSummaries } from "@/actions/summary"
import type { GetSummariesParams } from "@/schemas/summary"

type SummariesParams = Omit<GetSummariesParams, "cursor">

export type SummaryListItem = {
  id: string
  title: string
  keywords: string[]
  createdAt: Date
  updatedAt: Date
}

type SummariesData = {
  summaries: SummaryListItem[]
  nextCursor: string | null
}

export function useSummaries(params: SummariesParams = {}) {
  return useSWR<SummariesData | null>(
    "summaries",
    async () => {
      const result = await getSummaries(params)
      if (result?.serverError) throw new Error(result.serverError)
      return result?.data ?? null
    }
  )
}
