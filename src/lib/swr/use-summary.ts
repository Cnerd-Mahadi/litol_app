"use client"

import useSWR from "swr"
import { getSummaryById } from "@/actions/summary"
import type { SummaryItem } from "@/ui/summary/summary-reader"

export function useSummary(id: string) {
  return useSWR<SummaryItem | null>(["summary", id], async () => {
    const res = await getSummaryById({ id })
    if (res?.serverError) throw new Error(res.serverError)
    return (res?.data?.summary as SummaryItem | undefined) ?? null
  })
}
