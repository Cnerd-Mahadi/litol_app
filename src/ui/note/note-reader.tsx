"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "@/ui/shared/menu";
import { hueDot, hueFor } from "@/ui/shared/icon-chip";
import { BackIcon, DeleteIcon, EditIcon, MoreIcon } from "@/ui/shared/icons";
import { fmtDate } from "@/lib/time";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteNoteDialog } from "./delete-note-dialog";

export type NoteCue = {
	id: string;
	cue: string;
	details: string;
	noteId: string;
};
export type NoteItem = {
	id: string;
	title: string;
	subjectId: string;
	subject?: { id: string; name: string };
	description: string | null;
	keywords: string[];
	createdAt: Date;
	updatedAt: Date;
	cues: NoteCue[];
};

function CueRow({ cue, index }: { cue: NoteCue; index: number }) {
	return (
		<AccordionItem
			value={cue.id}
			className="overflow-hidden rounded-xl border border-border bg-card">
			<AccordionTrigger className="items-center gap-3.5 px-5 py-4 text-left hover:bg-accent hover:no-underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&>svg]:size-4">
				<span className="shrink-0 text-[11px] tabular-nums text-foreground-faint">
					{String(index + 1).padStart(2, "0")}
				</span>
				<span className="flex-1 text-[13.5px] font-medium text-foreground">
					{cue.cue}
				</span>
			</AccordionTrigger>
			<AccordionContent className="border-t border-border px-5 pt-4 pb-5">
				<p className="pl-7.5 text-[13.5px] leading-relaxed text-muted-foreground">
					{cue.details}
				</p>
			</AccordionContent>
		</AccordionItem>
	);
}

function NoteReaderActions({ note }: { note: NoteItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<Menu
				trigger={
					<button
						aria-label="Note actions"
						className="grid size-8 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<MoreIcon size={18} strokeWidth={1.5} aria-hidden />
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
				onDeleted={() => router.push("/note")}
			/>
		</>
	);
}

export function NoteReader({ note }: { note: NoteItem }) {
	const subjectName = note.subject?.name ?? note.subjectId.slice(0, 8);

	return (
		<div className="animate-fade-up">
			<div className="mb-5 flex items-center justify-between">
				<Link
					href="/note"
					className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
					<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
					Back to notes
				</Link>
				<NoteReaderActions note={note} />
			</div>

			<div className="max-w-180">
				<div className="mb-3 flex items-center gap-2.5">
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
				</div>
				<h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-[26px]">
					{note.title}
				</h1>
				{note.keywords.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{note.keywords.map((k) => (
							<span
								key={k}
								className="inline-flex h-7 items-center whitespace-nowrap rounded-md border border-border bg-secondary px-3 text-[12.5px] font-medium text-secondary-foreground">
								{k}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="mt-8 max-w-180 space-y-8">
				{note.description && (
					<p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-foreground">
						{note.description}
					</p>
				)}
				{note.cues.length > 0 && (
					<div>
						<div className="mb-3 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
							Cues{" "}
							<span className="font-normal normal-case text-foreground-faint">
								· click to reveal
							</span>
						</div>
						<Accordion type="multiple" className="space-y-2">
							{note.cues.map((c, i) => (
								<CueRow key={c.id} cue={c} index={i} />
							))}
						</Accordion>
					</div>
				)}
				{!note.description && note.cues.length === 0 && (
					<div className="border-t border-border py-8 text-center text-[14px] text-muted-foreground">
						No content added to this note yet.
					</div>
				)}
			</div>
		</div>
	);
}
