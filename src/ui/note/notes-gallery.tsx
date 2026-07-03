"use client";

import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { useSubjects } from "@/lib/swr/use-subjects";
import { hueChip, hueFor, IconChip } from "@/ui/shared/icon-chip";
import { fmtDate } from "@/lib/time";
import { ArrowUpRight, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

function NoteCard({
	note,
	subjectName,
}: {
	note: NoteListItem;
	subjectName: string;
}) {
	return (
		<Link
			href={`/note/${note.id}`}
			className="lift group flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card) hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
			<IconChip Icon={FileText} color="blue" size={44} />
			<div className="min-w-0 flex-1">
				<div className="truncate text-[14.5px] font-medium text-foreground">
					{note.title}
				</div>
				<div className="mt-1.5 flex flex-wrap items-center gap-3">
					<span
						className={`inline-flex h-6 items-center whitespace-nowrap rounded-md px-2 text-[11px] font-medium uppercase tracking-[0.04em] ${hueChip(
							hueFor(subjectName),
						)}`}>
						{subjectName}
					</span>
					<span className="text-[11px] tabular-nums text-foreground-faint">
						{fmtDate(note.createdAt)}
					</span>
					{note._count.cues > 0 && (
						<span className="flex items-center gap-1 text-[11px] text-muted-foreground">
							<MessageSquare size={12} strokeWidth={1.5} aria-hidden />
							{note._count.cues} cues
						</span>
					)}
				</div>
			</div>
			<ArrowUpRight
				size={16}
				strokeWidth={1.5}
				className="shrink-0 text-foreground-faint transition-colors group-hover:text-primary"
				aria-hidden
			/>
		</Link>
	);
}

function NoteSkeleton() {
	return (
		<div className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card)">
			<div className="shimmer size-11 shrink-0 rounded-lg bg-muted" />
			<div className="flex-1 space-y-2">
				<div className="shimmer h-4 w-2/3 rounded-md bg-muted" />
				<div className="shimmer h-3 w-1/3 rounded-md bg-muted" />
			</div>
		</div>
	);
}

export function NotesGallery() {
	const { data, isLoading } = useNotes();
	const { data: subjectsData } = useSubjects();
	const notes = data?.notes ?? [];
	const subjects = subjectsData?.subjects ?? [];

	const subjectName = (id: string) =>
		subjects.find((s) => s.id === id)?.name ?? id.slice(0, 8);

	if (!isLoading && notes.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card py-16 text-center shadow-(--shadow-card)">
				<IconChip
					Icon={FileText}
					color="blue"
					size={44}
					className="mx-auto mb-4"
				/>
				<h3 className="text-[15px] font-medium text-foreground">
					No notes yet
				</h3>
				<p className="mt-1 text-[13px] text-muted-foreground">
					Create your first note on the Create tab to start your library.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 lg:grid-cols-2">
			{isLoading
				? [1, 2, 3, 4].map((i) => <NoteSkeleton key={i} />)
				: notes.map((n) => (
						<NoteCard
							key={n.id}
							note={n}
							subjectName={subjectName(n.subjectId)}
						/>
					))}
		</div>
	);
}
