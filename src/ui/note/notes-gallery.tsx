"use client";

import { Card } from "@/components/ui/card";
import { Menu } from "@/ui/shared/menu";
import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { useSubjects } from "@/lib/swr/use-subjects";
import { hueDot, hueFor } from "@/ui/shared/icon-chip";
import { DeleteIcon, EditIcon, MoreIcon, NoteIcon } from "@/ui/shared/icons";
import { fmtDate } from "@/lib/time";
import { useIsDemo } from "@/hooks/use-is-demo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteNoteDialog } from "./delete-note-dialog";

function NoteRowMenu({ note }: { note: NoteListItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);
	const isDemo = useIsDemo();

	if (isDemo) return null;

	return (
		<div className="relative z-10 shrink-0">
			<Menu
				trigger={
					<button
						aria-label="Note actions"
						className="grid size-7 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
						<MoreIcon size={16} strokeWidth={1.5} aria-hidden />
					</button>
				}
				items={[
					{
						label: "Edit",
						icon: <EditIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => router.push(`/note/${note.id}/edit`),
					},
					{
						label: "Delete",
						icon: <DeleteIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => setDeleteOpen(true),
						destructive: true,
					},
				]}
			/>

			<DeleteNoteDialog
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				id={note.id}
				title={note.title}
			/>
		</div>
	);
}

function NoteRow({ note, subjectName }: { note: NoteListItem; subjectName: string }) {
	return (
		<div className="group relative flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-secondary/50 sm:px-4">
			<Link
				href={`/note/${note.id}`}
				aria-label={note.title}
				className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
			/>
			<NoteIcon
				size={16}
				strokeWidth={1.5}
				aria-hidden
				className="pointer-events-none relative z-10 shrink-0 text-foreground-faint transition-colors group-hover:text-foreground"
			/>
			<div className="pointer-events-none relative z-10 min-w-0 flex-1">
				<div className="truncate text-ui font-medium text-foreground">{note.title}</div>
				<div className="mt-0.5 flex min-w-0 items-center gap-2 text-caption text-muted-foreground">
					<span className="inline-flex shrink-0 items-center gap-1.5">
						<span
							className={`size-1.5 shrink-0 rounded-full ${hueDot(hueFor(subjectName))}`}
							aria-hidden
						/>
						{subjectName}
					</span>
					{note._count.cues > 0 && (
						<>
							<span className="text-foreground-faint" aria-hidden>·</span>
							<span className="shrink-0 tabular-nums">
								{note._count.cues} {note._count.cues === 1 ? "cue" : "cues"}
							</span>
						</>
					)}
					{note.keywords.slice(0, 2).map((k) => (
						<span
							key={k}
							className="hidden truncate rounded border border-border px-1.5 py-px text-micro font-normal text-muted-foreground md:inline">
							{k}
						</span>
					))}
				</div>
			</div>
			<span className="pointer-events-none relative z-10 hidden shrink-0 text-caption tabular-nums text-foreground-faint sm:block">
				{fmtDate(note.createdAt)}
			</span>
			<NoteRowMenu note={note} />
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

export function NotesGallery() {
	const { data, isLoading, error, mutate } = useNotes();
	const { data: subjectsData } = useSubjects();
	const notes = data?.notes ?? [];
	const subjects = subjectsData?.subjects ?? [];

	const subjectName = (id: string) =>
		subjects.find((s) => s.id === id)?.name ?? id.slice(0, 8);

	if (error) {
		return (
			<div className="flex flex-col items-start rounded-lg border border-danger-border bg-danger-bg p-5">
				<p className="text-caption text-danger-text">
					Couldn&apos;t load your notes. Check your connection and try again.
				</p>
				<button
					onClick={() => mutate()}
					className="mt-3 rounded-md border border-border bg-secondary px-3 py-1.5 text-caption font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					Retry
				</button>
			</div>
		);
	}

	if (!isLoading && notes.length === 0) {
		return (
			<Card className="flex flex-col items-center py-16 text-center">
				<NoteIcon size={24} strokeWidth={1.5} aria-hidden className="mb-3 text-foreground-faint" />
				<h3 className="text-title font-semibold text-foreground">No notes yet</h3>
				<p className="mt-1 max-w-xs text-caption text-muted-foreground">
					Write your first note with a few cues. Summaries and quizzes are built from
					them.
				</p>
			</Card>
		);
	}

	return (
		<Card className="divide-y divide-border overflow-hidden">
			{isLoading
				? [1, 2, 3, 4, 5, 6].map((i) => <RowSkeleton key={i} />)
				: notes.map((n) => (
						<NoteRow key={n.id} note={n} subjectName={subjectName(n.subjectId)} />
					))}
		</Card>
	);
}
