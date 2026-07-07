"use client";

import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { useSubjects } from "@/lib/swr/use-subjects";
import { hueDot, hueFor, IconChip } from "@/ui/shared/icon-chip";
import {
	CuesIcon,
	DeleteIcon,
	EditIcon,
	MoreIcon,
	NoteIcon,
} from "@/ui/shared/icons";
import { fmtDate } from "@/lib/time";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteNoteDialog } from "./delete-note-dialog";

function NoteCardMenu({ note }: { note: NoteListItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<div className="relative z-10 shrink-0">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						aria-label="Note actions"
						className="grid size-8 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
						<MoreIcon size={16} strokeWidth={1.5} aria-hidden />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => router.push(`/note/${note.id}/edit`)}>
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

			<DeleteNoteDialog
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				id={note.id}
				title={note.title}
			/>
		</div>
	);
}

function NoteCard({
	note,
	subjectName,
}: {
	note: NoteListItem;
	subjectName: string;
}) {
	return (
		<Card className="lift group relative flex h-full flex-col p-5 shadow-(--shadow-card) hover:border-primary">
			<Link
				href={`/note/${note.id}`}
				aria-label={note.title}
				className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			/>
			<div className="relative z-10 flex items-center justify-between">
				<IconChip Icon={NoteIcon} color="blue" size={36} className="pointer-events-none" />
				<NoteCardMenu note={note} />
			</div>
			<div className="pointer-events-none relative z-10 mt-4 line-clamp-2 flex-1 text-[14.5px] font-medium leading-snug text-foreground">
				{note.title}
			</div>
			{note.keywords.length > 0 && (
				<div className="pointer-events-none relative z-10 mt-3 flex flex-wrap gap-1.5">
					{note.keywords.slice(0, 3).map((k) => (
						<span
							key={k}
							className="inline-flex h-6 items-center whitespace-nowrap rounded-md border border-border bg-secondary px-2 text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
							{k}
						</span>
					))}
				</div>
			)}
			<div className="pointer-events-none relative z-10 mt-3 flex flex-wrap items-center gap-3">
				<span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
					<span
						className={`size-1.5 shrink-0 rounded-full ${hueDot(hueFor(subjectName))}`}
						aria-hidden
					/>
					{subjectName}
				</span>
				<span className="text-[11px] tabular-nums text-foreground-faint">
					{fmtDate(note.createdAt)}
				</span>
				{note._count.cues > 0 && (
					<span className="flex items-center gap-1 text-[11px] text-muted-foreground">
						<CuesIcon size={12} strokeWidth={1.5} aria-hidden />
						{note._count.cues} cues
					</span>
				)}
			</div>
		</Card>
	);
}

function NoteSkeleton() {
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

export function NotesGallery() {
	const { data, isLoading } = useNotes();
	const { data: subjectsData } = useSubjects();
	const notes = data?.notes ?? [];
	const subjects = subjectsData?.subjects ?? [];

	const subjectName = (id: string) =>
		subjects.find((s) => s.id === id)?.name ?? id.slice(0, 8);

	if (!isLoading && notes.length === 0) {
		return (
			<Card className="py-16 text-center shadow-(--shadow-card)">
				<IconChip
					Icon={NoteIcon}
					color="blue"
					size={44}
					className="mx-auto mb-4"
				/>
				<h3 className="text-[15px] font-medium text-foreground">No notes yet</h3>
				<p className="mt-1 text-[13px] text-muted-foreground">
					Use “Create” to start your library.
				</p>
			</Card>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{isLoading
				? [1, 2, 3, 4, 5, 6].map((i) => <NoteSkeleton key={i} />)
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
