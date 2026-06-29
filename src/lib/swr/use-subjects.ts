"use client"

import useSWR from "swr"
import { getSubjects } from "@/actions/user"
import type { GetSubjectsParams } from "@/schemas/user"

export type SubjectItem = {
  id: string
  name: string
}

export type SubjectsData = {
  subjects: SubjectItem[]
}

export function useSubjects(params: GetSubjectsParams = {}) {
  return useSWR<SubjectsData | null>("subjects", async () => {
    const result = await getSubjects(params)
    if (result?.serverError) throw new Error(result.serverError)
    return result?.data ?? null
  })
}
