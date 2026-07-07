"use client";

import { useSummary } from "@/lib/swr/use-summary";
import { SummaryEditForm } from "@/ui/summary/summary-edit-form";
import { BackIcon, SpinnerIcon } from "@/ui/shared/icons";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditSummaryPage() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const { data: summary, isLoading } = useSummary(id);

	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<Link
				href={`/summary/${id}`}
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
				Back to summary
			</Link>
			{isLoading || !summary ? (
				<div className="flex justify-center py-12">
					<SpinnerIcon className="animate-spin text-muted-foreground" />
				</div>
			) : (
				<SummaryEditForm
					summary={{
						id: summary.id,
						title: summary.title,
						description: summary.description,
						keywords: summary.keywords,
						content: summary.content,
					}}
					onDone={() => router.push(`/summary/${id}`)}
				/>
			)}
		</div>
	);
}
