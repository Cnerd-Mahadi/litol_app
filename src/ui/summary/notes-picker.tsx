"use client";

import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { cn } from "@/lib/utils";
import { fmtDate } from "@/lib/time";
import { CheckIcon, NoteIcon } from "@/ui/shared/icons";

export function NotesPicker({
	subjectId,
	selectedIds,
	onToggle,
}: {
	subjectId: string;
	selectedIds: string[];
	onToggle: (id: string) => void;
}) {
	const { data, isLoading } = useNotes();

	if (!subjectId) {
		return (
			<div className="flex min-h-64 flex-col items-center justify-center gap-2 text-center text-caption text-muted-foreground">
				<NoteIcon size={20} strokeWidth={1.5} className="text-foreground-faint" />
				Pick a subject to see its notes.
			</div>
		);
	}

	const notes: NoteListItem[] = (data?.notes ?? []).filter((n) => n.subjectId === subjectId);

	if (isLoading) {
		return (
			<div className="min-h-64 space-y-2">
				{[1, 2, 3].map((i) => (
					<div key={i} className="shimmer h-14 rounded-lg bg-muted" />
				))}
			</div>
		);
	}

	if (notes.length === 0) {
		return (
			<div className="flex min-h-64 items-center justify-center text-center text-caption text-muted-foreground">
				No notes for this subject yet.
			</div>
		);
	}

	return (
		<div className="grid min-h-64 max-h-96 grid-cols-1 content-start gap-2 overflow-auto sm:grid-cols-2 xl:grid-cols-3">
			{notes.map((n) => {
				const sel = selectedIds.includes(n.id);
				return (
					<button
						key={n.id}
						type="button"
						onClick={() => onToggle(n.id)}
						aria-pressed={sel}
						className={cn(
							"flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							sel
								? "border-border-strong bg-secondary/50"
								: "border-border hover:bg-secondary/40",
						)}>
						<span
							className={cn(
								"grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
								sel ? "border-primary bg-primary text-primary-foreground" : "border-border-strong",
							)}>
							{sel && <CheckIcon size={12} strokeWidth={2.5} />}
						</span>
						<div className="min-w-0 flex-1">
							<div className="truncate text-ui font-medium text-foreground">{n.title}</div>
							<div className="mt-0.5 text-caption tabular-nums text-muted-foreground">
								{n._count.cues} {n._count.cues === 1 ? "cue" : "cues"} · {fmtDate(n.createdAt)}
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
