"use client";

import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { cn } from "@/lib/utils";
import { fmtDate } from "@/lib/time";
import { Check } from "lucide-react";

export function NotesPicker({
	selectedIds,
	onToggle,
}: {
	selectedIds: string[];
	onToggle: (id: string) => void;
}) {
	const { data, isLoading } = useNotes();
	const notes: NoteListItem[] = data?.notes ?? [];

	if (isLoading) {
		return (
			<div className="space-y-2">
				{[1, 2, 3].map((i) => (
					<div key={i} className="shimmer h-14 rounded-lg bg-muted" />
				))}
			</div>
		);
	}

	if (notes.length === 0) {
		return (
			<div className="py-8 text-center text-[13px] text-muted-foreground">
				No notes yet. Create some on the Notes page first.
			</div>
		);
	}

	return (
		<div className="max-h-72 space-y-2 overflow-auto">
			{notes.map((n) => {
				const sel = selectedIds.includes(n.id);
				return (
					<button
						key={n.id}
						type="button"
						onClick={() => onToggle(n.id)}
						aria-pressed={sel}
						className={cn(
							"flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							sel
								? "border-primary bg-accent"
								: "border-border bg-card hover:bg-muted",
						)}>
						<span
							className={cn(
								"grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
								sel
									? "border-primary bg-primary text-primary-foreground"
									: "border-border",
							)}>
							{sel && <Check size={12} strokeWidth={2.5} />}
						</span>
						<div className="min-w-0 flex-1">
							<div className="truncate text-[13.5px] font-medium text-foreground">
								{n.title}
							</div>
							<div className="mt-0.5 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
								{n._count.cues} cues · {fmtDate(n.createdAt)}
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
