import { SummaryDetail } from "@/ui/summary/summary-detail"

export default function SummaryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
      <SummaryDetail id={params.id} />
    </div>
  )
}
