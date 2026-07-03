"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { cn } from "@/lib/utils";
import { SubjectSelector } from "@/ui/shared/subject-selector";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

export type GenerateParams = {
	noteIds: string[];
	subjectId: string;
	numberOfQuizzes: number;
	query: string;
	label: string;
};

export function QuizInput({
	onGenerate,
	isPending,
}: {
	onGenerate: (params: GenerateParams) => void;
	isPending: boolean;
}) {
	const [subjectId, setSubjectId] = useState("");
	const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
	const [count, setCount] = useState(5);
	const [query, setQuery] = useState("");
	const [attempted, setAttempted] = useState(false);

	const { data: notesData, isLoading: notesLoading } = useNotes();
	const allNotes: NoteListItem[] = notesData?.notes ?? [];
	const notes = subjectId
		? allNotes.filter((n) => n.subjectId === subjectId)
		: [];

	const toggleNote = (id: string) =>
		setSelectedNoteIds((ids) =>
			ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
		);

	const canGenerate =
		subjectId && selectedNoteIds.length > 0 && query.trim() && !isPending;

	const generate = () => {
		setAttempted(true);
		if (!canGenerate) return;
		const firstNote = notes.find((n) => n.id === selectedNoteIds[0]);
		onGenerate({
			noteIds: selectedNoteIds,
			subjectId,
			numberOfQuizzes: count,
			query: query.trim(),
			label: firstNote?.title ?? query.trim(),
		});
	};

	return (
		<div className="mx-auto max-w-[600px] space-y-6 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card) sm:p-6">
			{/* Subject */}
			<div className="space-y-2">
				<Label>Subject</Label>
				<SubjectSelector
					value={subjectId}
					onChange={(id) => {
						setSubjectId(id);
						setSelectedNoteIds([]);
					}}
					placeholder="Select a subject"
				/>
				{attempted && !subjectId && (
					<p className="text-[12px] text-destructive">Subject is required.</p>
				)}
			</div>

			{/* Notes */}
			{subjectId && (
				<div className="space-y-2">
					<Label>
						Notes{" "}
						<span className="text-muted-foreground">
							({selectedNoteIds.length} selected)
						</span>
					</Label>
					{notesLoading && (
						<div className="space-y-2">
							{[1, 2].map((i) => (
								<div key={i} className="shimmer h-12 rounded-lg bg-muted" />
							))}
						</div>
					)}
					{!notesLoading && notes.length === 0 && (
						<div className="rounded-lg border border-border bg-card py-6 text-center text-[13px] text-muted-foreground">
							No notes for this subject yet.
						</div>
					)}
					{!notesLoading && notes.length > 0 && (
						<div className="max-h-52 space-y-2 overflow-auto">
							{notes.map((n) => {
								const sel = selectedNoteIds.includes(n.id);
								return (
									<button
										key={n.id}
										type="button"
										onClick={() => toggleNote(n.id)}
										aria-pressed={sel}
										className={cn(
											"flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
										<span className="truncate text-[13.5px] font-medium text-foreground">
											{n.title}
										</span>
									</button>
								);
							})}
						</div>
					)}
					{attempted && selectedNoteIds.length === 0 && (
						<p className="text-[12px] text-destructive">Select at least one note.</p>
					)}
				</div>
			)}

			{/* Query */}
			<div className="space-y-2">
				<Label htmlFor="quiz-query">Describe your quiz</Label>
				<Input
					id="quiz-query"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && generate()}
					placeholder="e.g. test me on how enzymes work and why temperature matters"
				/>
				{attempted && !query.trim() && (
					<p className="text-[12px] text-destructive">Describe what to quiz you on.</p>
				)}
			</div>

			{/* Count */}
			<div className="space-y-2.5">
				<Label>Questions</Label>
				<div className="flex gap-2">
					{[5, 10, 15].map((n) => (
						<button
							key={n}
							type="button"
							onClick={() => setCount(n)}
							aria-pressed={count === n}
							className={cn(
								"h-10 flex-1 rounded-md border text-[13px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
								count === n
									? "border-primary bg-accent text-accent-foreground"
									: "border-border text-muted-foreground hover:text-foreground",
							)}>
							{n}
						</button>
					))}
				</div>
			</div>

			<Button onClick={generate} disabled={!canGenerate} className="h-12 w-full text-[15px]">
				<Sparkles size={17} strokeWidth={1.5} />
				Generate quiz
			</Button>
		</div>
	);
}
