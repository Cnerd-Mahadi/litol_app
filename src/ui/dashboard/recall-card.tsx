"use client";

import { Card } from "@/components/ui/card";
import { useReviewDeck } from "@/lib/swr/use-review-deck";
import { useSubjects } from "@/lib/swr/use-subjects";
import { cn } from "@/lib/utils";
import {
	ChevronLeftIcon,
	DeckIcon,
	FlipIcon,
	NextIcon,
	SummaryIcon,
} from "@/ui/shared/icons";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function RecallCard() {
	const { data: deck, isLoading } = useReviewDeck();
	const { data: subjectsData } = useSubjects();
	const subjects = subjectsData?.subjects ?? [];

	const [idx, setIdx] = useState(0);
	const [flipped, setFlipped] = useState(false);

	const total = deck?.length ?? 0;
	const cue = deck?.[idx];

	const go = useCallback(
		(dir: 1 | -1) => {
			setFlipped(false);
			setIdx((i) => (total ? (i + dir + total) % total : 0));
		},
		[total],
	);

	const onKey = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				setFlipped((f) => !f);
			} else if (e.key === "ArrowRight" || e.key.toLowerCase() === "j") {
				e.preventDefault();
				go(1);
			} else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "k") {
				e.preventDefault();
				go(-1);
			}
		},
		[go],
	);

	useEffect(() => {
		if (total && idx >= total) setIdx(0);
	}, [total, idx]);

	if (isLoading) {
		return <Card className="shimmer h-80" />;
	}

	if (!cue) {
		return (
			<Card className="flex h-80 flex-col items-center justify-center p-8 text-center">
				<SummaryIcon
					size={26}
					strokeWidth={1.5}
					aria-hidden
					className="mb-3 text-foreground-faint"
				/>
				<h3 className="text-[15px] font-medium text-foreground">
					Nothing to review yet
				</h3>
				<p className="mt-1 max-w-xs text-[13px] text-muted-foreground">
					Add cues to a note and they appear here as a recall deck you can flip
					through.
				</p>
				<Link
					href="/note"
					className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-[13px] font-medium text-primary-foreground transition-[filter] hover:brightness-110">
					Write a note
				</Link>
			</Card>
		);
	}

	const subjectName =
		subjects.find((s) => s.id === cue.subjectId)?.name ??
		cue.subjectId.slice(0, 8);
	const pct = total ? ((idx + 1) / total) * 100 : 0;

	return (
		<Card
			role="button"
			tabIndex={0}
			aria-label="Recall card. Press space to flip, arrows to move between cues."
			onKeyDown={onKey}
			onClick={() => setFlipped((f) => !f)}
			className="group relative flex h-80 cursor-pointer flex-col overflow-hidden outline-none transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-ring">
			<div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
				<div className="flex min-w-0 items-center gap-2.5">
					<DeckIcon
						size={16}
						strokeWidth={1.5}
						aria-hidden
						className="shrink-0 text-foreground-faint"
					/>
					<div className="min-w-0 leading-tight">
						<div className="text-[10px] font-medium uppercase tracking-[0.08em] text-foreground-faint">
							Review
						</div>
						<div className="truncate text-[13px] font-medium text-foreground">
							{subjectName}
						</div>
					</div>
				</div>
				<span className="shrink-0 text-[12px] tabular-nums text-foreground-faint">
					{idx + 1} / {total}
				</span>
			</div>

			<div className="flex flex-1 items-center justify-center px-5 py-5 sm:px-7 [perspective:1200px]">
				<div
					className={cn(
						"relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d] motion-reduce:transition-none",
						flipped ? "[transform:rotateY(180deg)]" : "",
					)}>
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden]">
						<span className="text-[10px] font-medium uppercase tracking-[0.08em] text-foreground-faint">
							Cue
						</span>
						<p className="text-[19px] font-semibold leading-snug text-foreground">
							{cue.cue}
						</p>
					</div>
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
						<span className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
							Answer
						</span>
						<p className="text-[15px] leading-relaxed text-muted-foreground">
							{cue.details}
						</p>
					</div>
				</div>
			</div>

			<div className="border-t border-border px-5 py-3">
				<div className="mb-2.5 h-0.5 overflow-hidden rounded-full bg-secondary">
					<div
						className="h-full rounded-full bg-primary transition-all duration-300"
						style={{ width: `${pct}%` }}
					/>
				</div>
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-1.5 text-[12px] text-foreground-faint">
						<FlipIcon size={13} strokeWidth={1.5} aria-hidden />
						<span className="sm:hidden">Tap to flip</span>
						<span className="hidden sm:inline">Press space to flip</span>
					</span>
					<div className="flex items-center gap-1">
						<button
							type="button"
							aria-label="Previous cue"
							onClick={(e) => {
								e.stopPropagation();
								go(-1);
							}}
							className="grid size-7 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-muted hover:text-foreground">
							<ChevronLeftIcon size={16} strokeWidth={1.75} />
						</button>
						<button
							type="button"
							aria-label="Next cue"
							onClick={(e) => {
								e.stopPropagation();
								go(1);
							}}
							className="grid size-7 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-muted hover:text-foreground">
							<NextIcon size={16} strokeWidth={1.75} />
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
}
