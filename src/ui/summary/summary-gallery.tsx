"use client";

import { Card } from "@/components/ui/card";
import { Menu } from "@/ui/shared/menu";
import { useSummaries } from "@/lib/swr/use-summaries";
import type { SummaryListItem } from "@/lib/swr/use-summaries";
import { useIsDemo } from "@/hooks/use-is-demo";
import { DeleteIcon, EditIcon, MoreIcon, SummaryIcon } from "@/ui/shared/icons";
import { fmtDate } from "@/lib/time";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteSummaryDialog } from "./delete-summary-dialog";

function SummaryRowMenu({ s }: { s: SummaryListItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);
	const isDemo = useIsDemo();

	if (isDemo) return null;

	return (
		<div className="relative z-10 shrink-0">
			<Menu
				trigger={
					<button
						aria-label="Summary actions"
						className="grid size-7 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
						<MoreIcon size={16} strokeWidth={1.5} aria-hidden />
					</button>
				}
				items={[
					{
						label: "Edit",
						icon: <EditIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => router.push(`/summary/${s.id}/edit`),
					},
					{
						label: "Delete",
						icon: <DeleteIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => setDeleteOpen(true),
						destructive: true,
					},
				]}
			/>

			<DeleteSummaryDialog
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				id={s.id}
				title={s.title}
			/>
		</div>
	);
}

function SummaryRow({ s }: { s: SummaryListItem }) {
	return (
		<div className="group relative flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-secondary/50 sm:px-4">
			<Link
				href={`/summary/${s.id}`}
				aria-label={s.title}
				className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
			/>
			<SummaryIcon
				size={16}
				strokeWidth={1.5}
				aria-hidden
				className="pointer-events-none relative z-10 shrink-0 text-foreground-faint transition-colors group-hover:text-foreground"
			/>
			<div className="pointer-events-none relative z-10 min-w-0 flex-1">
				<div className="truncate text-ui font-medium text-foreground">{s.title}</div>
				<div className="mt-0.5 flex min-w-0 items-center gap-2 text-caption text-muted-foreground">
					<span className="shrink-0 tabular-nums">
						{s.keywords.length} {s.keywords.length === 1 ? "keyword" : "keywords"}
					</span>
					{s.keywords.slice(0, 3).map((k) => (
						<span
							key={k}
							className="hidden truncate rounded border border-border px-1.5 py-px text-micro font-normal text-muted-foreground md:inline">
							{k}
						</span>
					))}
				</div>
			</div>
			<span className="pointer-events-none relative z-10 hidden shrink-0 text-caption tabular-nums text-foreground-faint sm:block">
				{fmtDate(s.createdAt)}
			</span>
			<SummaryRowMenu s={s} />
		</div>
	);
}

function RowSkeleton() {
	return (
		<div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
			<div className="shimmer size-4 rounded bg-muted" />
			<div className="flex-1 space-y-1.5">
				<div className="shimmer h-3.5 w-1/2 rounded bg-muted" />
				<div className="shimmer h-3 w-1/4 rounded bg-muted" />
			</div>
		</div>
	);
}

export function SummaryGallery() {
	const { data, isLoading, error, mutate } = useSummaries();
	const summaries = data?.summaries ?? [];

	if (error) {
		return (
			<div className="flex flex-col items-start rounded-lg border border-danger-border bg-danger-bg p-5">
				<p className="text-caption text-danger-text">
					Couldn&apos;t load your summaries. Check your connection and try again.
				</p>
				<button
					onClick={() => mutate()}
					className="mt-3 rounded-md border border-border bg-secondary px-3 py-1.5 text-caption font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					Retry
				</button>
			</div>
		);
	}

	if (!isLoading && summaries.length === 0) {
		return (
			<Card className="flex flex-col items-center py-16 text-center">
				<SummaryIcon size={24} strokeWidth={1.5} aria-hidden className="mb-3 text-foreground-faint" />
				<h3 className="text-title font-semibold text-foreground">No summaries yet</h3>
				<p className="mt-1 max-w-xs text-caption text-muted-foreground">
					Generate one from your notes, or write one yourself.
				</p>
			</Card>
		);
	}

	return (
		<Card className="divide-y divide-border overflow-hidden">
			{isLoading
				? [1, 2, 3, 4].map((i) => <RowSkeleton key={i} />)
				: summaries.map((s) => <SummaryRow key={s.id} s={s} />)}
		</Card>
	);
}
