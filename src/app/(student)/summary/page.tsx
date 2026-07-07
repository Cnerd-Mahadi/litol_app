import { IconChip } from "@/ui/shared/icon-chip";
import { CreateSummaryButton } from "@/ui/summary/create-summary-button";
import { SummaryGallery } from "@/ui/summary/summary-gallery";
import { SummaryIcon } from "@/ui/shared/icons";

export default function SummaryPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
				<div className="flex items-center gap-3.5 sm:items-start">
					<IconChip Icon={SummaryIcon} color="violet" size={44} tone="accent" />
					<div>
						<h1 className="text-[20px] font-semibold leading-none tracking-[-0.01em] text-foreground sm:text-[24px]">
							Summarizer
						</h1>
						<p className="mt-2 hidden max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:block">
							Generate a structured summary from your notes, or write one
							yourself, then save to your gallery.
						</p>
					</div>
				</div>
				<CreateSummaryButton />
			</div>
			<SummaryGallery />
		</div>
	);
}
