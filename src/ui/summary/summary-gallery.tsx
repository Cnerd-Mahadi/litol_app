"use client";

import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSummaries } from "@/lib/swr/use-summaries";
import type { SummaryListItem } from "@/lib/swr/use-summaries";
import { IconChip } from "@/ui/shared/icon-chip";
import {
	DeleteIcon,
	EditIcon,
	KeywordsIcon,
	MoreIcon,
	SummaryIcon,
} from "@/ui/shared/icons";
import { fmtDate } from "@/lib/time";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteSummaryDialog } from "./delete-summary-dialog";

function SummaryCardMenu({ s }: { s: SummaryListItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<div className="pointer-events-auto relative z-10">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						aria-label="Summary actions"
						className="grid size-8 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
						<MoreIcon size={16} strokeWidth={1.5} aria-hidden />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => router.push(`/summary/${s.id}/edit`)}>
						<EditIcon size={14} strokeWidth={1.5} aria-hidden />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setDeleteOpen(true)}
						className="text-destructive focus:text-destructive">
						<DeleteIcon size={14} strokeWidth={1.5} aria-hidden />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteSummaryDialog
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				id={s.id}
				title={s.title}
			/>
		</div>
	);
}

function SummaryCard({ s }: { s: SummaryListItem }) {
	return (
		<Card className="lift group relative flex h-full flex-col p-5 shadow-(--shadow-card) hover:border-primary">
			<Link
				href={`/summary/${s.id}`}
				aria-label={s.title}
				className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			/>
			<div className="relative z-10 flex items-center justify-between">
				<IconChip
					Icon={SummaryIcon}
					color="violet"
					size={36}
					className="pointer-events-none"
				/>
				<SummaryCardMenu s={s} />
			</div>
			<div className="pointer-events-none relative z-10 mt-4 line-clamp-2 flex-1 text-[14.5px] font-medium leading-snug text-foreground">
				{s.title}
			</div>
			{s.keywords.length > 0 && (
				<div className="pointer-events-none relative z-10 mt-3 flex flex-wrap gap-1.5">
					{s.keywords.slice(0, 3).map((k) => (
						<span
							key={k}
							className="inline-flex h-6 items-center whitespace-nowrap rounded-md border border-border bg-secondary px-2 text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
							{k}
						</span>
					))}
				</div>
			)}
			<div className="pointer-events-none relative z-10 mt-3 flex items-center justify-between">
				<span className="text-[11px] tabular-nums text-foreground-faint">
					{fmtDate(s.createdAt)}
				</span>
				<span className="flex items-center gap-1 text-[11px] text-muted-foreground">
					<KeywordsIcon size={12} strokeWidth={1.5} aria-hidden />
					{s.keywords.length} keywords
				</span>
			</div>
		</Card>
	);
}

function SummarySkeleton() {
	return (
		<Card className="p-5 shadow-(--shadow-card)">
			<div className="shimmer size-9 rounded-[10px] bg-muted" />
			<div className="mt-4 space-y-2">
				<div className="shimmer h-4 w-3/4 rounded-md bg-muted" />
				<div className="shimmer h-3 w-1/3 rounded-md bg-muted" />
			</div>
		</Card>
	);
}

export function SummaryGallery() {
	const { data, isLoading } = useSummaries();
	const summaries = data?.summaries ?? [];

	if (!isLoading && summaries.length === 0) {
		return (
			<Card className="py-16 text-center shadow-(--shadow-card)">
				<IconChip
					Icon={SummaryIcon}
					color="violet"
					size={44}
					className="mx-auto mb-4"
				/>
				<h3 className="text-[15px] font-medium text-foreground">
					No summaries yet
				</h3>
				<p className="mt-1 text-[13px] text-muted-foreground">
					Use “Create” to generate or write one.
				</p>
			</Card>
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
