"use client";

import { useSummaries } from "@/lib/swr/use-summaries";
import type { SummaryListItem } from "@/lib/swr/use-summaries";
import { hueChip, hueFor, IconChip } from "@/ui/shared/icon-chip";
import { fmtDate } from "@/lib/time";
import { ArrowUpRight, Sparkles, Tag } from "lucide-react";
import Link from "next/link";

function SummaryCard({ s }: { s: SummaryListItem }) {
	return (
		<Link
			href={`/summary/${s.id}`}
			className="lift group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-(--shadow-card) hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
			<div className="flex items-center justify-between">
				<IconChip Icon={Sparkles} color="violet" size={36} />
				<ArrowUpRight
					size={16}
					strokeWidth={1.5}
					className="text-foreground-faint transition-colors group-hover:text-primary"
					aria-hidden
				/>
			</div>
			<div className="mt-4 line-clamp-2 flex-1 text-[14.5px] font-medium leading-snug text-foreground">
				{s.title}
			</div>
			{s.keywords.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1.5">
					{s.keywords.slice(0, 3).map((k) => (
						<span
							key={k}
							className={`inline-flex h-6 items-center whitespace-nowrap rounded-md px-2 text-[11px] font-medium uppercase tracking-[0.04em] ${hueChip(
								hueFor(k),
							)}`}>
							{k}
						</span>
					))}
				</div>
			)}
			<div className="mt-3 flex items-center justify-between">
				<span className="text-[11px] tabular-nums text-foreground-faint">
					{fmtDate(s.createdAt)}
				</span>
				<span className="flex items-center gap-1 text-[11px] text-muted-foreground">
					<Tag size={12} strokeWidth={1.5} aria-hidden />
					{s.keywords.length} keywords
				</span>
			</div>
		</Link>
	);
}

function SummarySkeleton() {
	return (
		<div className="rounded-lg border border-border bg-card p-5 shadow-(--shadow-card)">
			<div className="shimmer size-9 rounded-[10px] bg-muted" />
			<div className="mt-4 space-y-2">
				<div className="shimmer h-4 w-3/4 rounded-md bg-muted" />
				<div className="shimmer h-3 w-1/3 rounded-md bg-muted" />
			</div>
		</div>
	);
}

export function SummaryGallery() {
	const { data, isLoading } = useSummaries();
	const summaries = data?.summaries ?? [];

	if (!isLoading && summaries.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card py-16 text-center shadow-(--shadow-card)">
				<IconChip
					Icon={Sparkles}
					color="violet"
					size={44}
					className="mx-auto mb-4"
				/>
				<h3 className="text-[15px] font-medium text-foreground">
					No summaries yet
				</h3>
				<p className="mt-1 text-[13px] text-muted-foreground">
					Generate your first summary on the Generate tab.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{isLoading
				? [1, 2, 3].map((i) => <SummarySkeleton key={i} />)
				: summaries.map((s) => <SummaryCard key={s.id} s={s} />)}
		</div>
	);
}
