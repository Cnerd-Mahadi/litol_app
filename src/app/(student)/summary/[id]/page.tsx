import { notFound } from "next/navigation"
import { getSummaryById } from "@/actions/summary"
import { SummaryReader } from "@/ui/summary/summary-reader"
import type { SummaryItem } from "@/ui/summary/summary-reader"

export const dynamic = "force-dynamic"

export default async function SummaryDetailPage({ params }: { params: { id: string } }) {
  const result = await getSummaryById({ id: params.id })

  if (result?.serverError) throw new Error(result.serverError)
  if (!result?.data?.summary) notFound()

  const summary = result.data.summary as SummaryItem

  return (
    <div className="py-9 px-8 xl:px-12 max-w-[1180px] mx-auto">
      <SummaryReader s={summary} />
    </div>
  )
}
