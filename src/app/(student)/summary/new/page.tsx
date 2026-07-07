"use client";

import { BackIcon } from "@/ui/shared/icons";
import { SummaryCreateFlow } from "@/ui/summary/summary-create-flow";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewSummaryPage() {
	const router = useRouter();

	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<Link
				href="/summary"
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<BackIcon
					size={15}
					strokeWidth={1.5}
					className="rotate-180"
					aria-hidden
				/>
				Back to gallery
			</Link>
			<SummaryCreateFlow onDone={() => router.push("/summary")} />
		</div>
	);
}
