"use client"

import useSWR from "swr"
import { getDashboardData } from "@/actions/user"

export type DashboardActivity = {
  type: "note" | "summary"
  id: string
  title: string
  createdAt: Date
}

export type DashboardData = {
  noteCount: number
  summaryCount: number
  subjectCount: number
  quizzesTaken: number
  recentActivity: DashboardActivity[]
}

export function useDashboard() {
  return useSWR<DashboardData | null>("dashboard", async () => {
    const result = await getDashboardData()
    if (result?.serverError) throw new Error(result.serverError)
    return result?.data ?? null
  })
}
