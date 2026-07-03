"use client";

import { cn } from "@/lib/utils";
import { hueChip, hueFor } from "@/ui/shared/icon-chip";
import { fmtDate } from "@/lib/time";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
	const [open, setOpen] = useState(false);
	return (
		<div className="overflow-hidden rounded-lg border border-border bg-card">
			<button
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
				className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
				<span className="shrink-0 text-[11px] tabular-nums text-foreground-faint">
					{String(index + 1).padStart(2, "0")}
				</span>
				<span className="flex-1 text-[13.5px] font-medium text-foreground">
					{cue.cue}
				</span>
				<ChevronRight
					size={14}
					strokeWidth={1.5}
					className={cn(
						"shrink-0 text-foreground-faint transition-transform",
						open ? "rotate-90" : "",
					)}
					aria-hidden
				/>
			</button>
			{open && (
				<div className="border-t border-border px-4 pb-4 pt-3">
					<p className="pl-[26px] text-[13.5px] leading-relaxed text-muted-foreground">
						{cue.details}
					</p>
				</div>
			)}
		</div>
	);
}

export function NoteReader({ note }: { note: NoteItem }) {
	const subjectName = note.subject?.name ?? note.subjectId.slice(0, 8);

	return (
		<div className="mx-auto max-w-[720px] animate-fade-up">
			<Link
				href="/note"
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<ChevronRight size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
				Back to notes
			</Link>

			<div className="overflow-hidden rounded-lg border border-border bg-card shadow-(--shadow-card)">
				<div className="border-b border-border px-5 pb-5 pt-5 sm:px-7 sm:pt-7">
					<div className="mb-3 flex items-center gap-2.5">
						<span
							className={`inline-flex h-6 items-center whitespace-nowrap rounded-md px-2 text-[11px] font-medium uppercase tracking-[0.04em] ${hueChip(
								hueFor(subjectName),
							)}`}>
							{subjectName}
						</span>
						<span className="text-[11px] tabular-nums text-foreground-faint">
							{fmtDate(note.createdAt)}
						</span>
					</div>
					<h1 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-[24px]">
						{note.title}
					</h1>
					{note.keywords.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
							{note.keywords.map((k) => (
								<span
									key={k}
									className={`inline-flex h-7 items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-medium ${hueChip(
										hueFor(k),
									)}`}>
									{k}
								</span>
							))}
						</div>
					)}
				</div>

				<div className="space-y-7 p-5 sm:p-7">
					{note.description && (
						<div>
							<div className="mb-3 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
								Notes
							</div>
							<p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-foreground">
								{note.description}
							</p>
						</div>
					)}
					{note.cues.length > 0 && (
						<div>
							<div className="mb-3 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
								Cues{" "}
								<span className="font-normal normal-case text-foreground-faint">
									· click to reveal
								</span>
							</div>
							<div className="space-y-2">
								{note.cues.map((c, i) => (
									<CueRow key={c.id} cue={c} index={i} />
								))}
							</div>
						</div>
					)}
					{!note.description && note.cues.length === 0 && (
						<div className="py-8 text-center text-[14px] text-muted-foreground">
							No content added to this note yet.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
