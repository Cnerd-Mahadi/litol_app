import { CreateSummaryButton } from "@/ui/summary/create-summary-button";
import { SummaryGallery } from "@/ui/summary/summary-gallery";

export default function SummaryPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-10">
			<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="text-heading font-semibold text-foreground">Summaries</h1>
					<p className="mt-1 text-caption text-muted-foreground">
						Generate a structured summary from your notes, or write one yourself.
					</p>
				</div>
				<CreateSummaryButton />
			</div>
			<SummaryGallery />
		</div>
	);
}
