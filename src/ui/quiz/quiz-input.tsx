"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/lib/swr/use-notes";
import type { NoteListItem } from "@/lib/swr/use-notes";
import { cn } from "@/lib/utils";
import { SubjectSelector } from "@/ui/shared/subject-selector";
import {
	CheckIcon,
	NoteIcon,
	QuestionsIcon,
	SubjectIcon,
	SummaryIcon,
} from "@/ui/shared/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type GenerateParams = {
	noteIds: string[];
	subjectId: string;
	numberOfQuizzes: number;
	query: string;
	label: string;
};

const quizInputSchema = z.object({
	subjectId: z.string().min(1),
	noteIds: z.array(z.string()).min(1),
	numberOfQuizzes: z.number(),
	query: z.string().min(1),
});
type QuizInputData = z.infer<typeof quizInputSchema>;

export function QuizInput({
	onGenerate,
	isPending,
}: {
	onGenerate: (params: GenerateParams) => void;
	isPending: boolean;
}) {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<QuizInputData>({
		resolver: zodResolver(quizInputSchema),
		defaultValues: { subjectId: "", noteIds: [], numberOfQuizzes: 5, query: "" },
	});

	const subjectId = watch("subjectId");
	const noteIds = watch("noteIds");
	const count = watch("numberOfQuizzes");

	const { data: notesData, isLoading: notesLoading } = useNotes();
	const allNotes: NoteListItem[] = notesData?.notes ?? [];
	const notes = subjectId
		? allNotes.filter((n) => n.subjectId === subjectId)
		: [];

	const toggleNote = (id: string) =>
		setValue(
			"noteIds",
			noteIds.includes(id) ? noteIds.filter((x) => x !== id) : [...noteIds, id],
			{ shouldValidate: true },
		);

	const onSubmit = (data: QuizInputData) => {
		const firstNote = notes.find((n) => n.id === data.noteIds[0]);
		onGenerate({
			noteIds: data.noteIds,
			subjectId: data.subjectId,
			numberOfQuizzes: data.numberOfQuizzes,
			query: data.query.trim(),
			label: firstNote?.title ?? data.query.trim(),
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-205 space-y-8">
			{/* Prompt — the actual ask */}
			<div>
				<label htmlFor="quiz-query" className="sr-only">
					Describe your quiz
				</label>
				<Textarea
					id="quiz-query"
					{...register("query")}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit(onSubmit)();
						}
					}}
					rows={3}
					placeholder="Test me on how enzymes work and why temperature matters…"
					className="w-full resize-none border-0 bg-transparent p-0 text-[20px] font-medium leading-snug text-foreground shadow-none outline-none placeholder:text-foreground-faint/70 focus-visible:ring-0"
				/>
				{errors.query && (
					<p className="mt-2 text-[12px] text-destructive">
						Describe what to quiz you on.
					</p>
				)}
			</div>

			<div className="border-t border-border">
				<div className="border-b border-border-strong py-3">
					<div className="flex items-center gap-3">
						<span className="flex w-28 shrink-0 items-center gap-1.5 text-[12px] text-muted-foreground">
							<SubjectIcon size={13} strokeWidth={1.5} aria-hidden />
							Subject
						</span>
						<SubjectSelector
							value={subjectId}
							onChange={(id) => {
								setValue("subjectId", id, { shouldValidate: true });
								setValue("noteIds", []);
							}}
							placeholder="Select a subject"
							manageable={false}
							className="h-8 flex-1 justify-start gap-1.5 text-[13.5px] font-medium data-placeholder:text-foreground-faint"
						/>
					</div>
					{errors.subjectId && (
						<p className="mt-1.5 pl-31 text-[12px] text-destructive">
							Subject is required.
						</p>
					)}
				</div>

				<div className="py-3">
					<div className="flex items-center gap-3">
						<span className="flex w-28 shrink-0 items-center gap-1.5 text-[12px] text-muted-foreground">
							<QuestionsIcon size={13} strokeWidth={1.5} aria-hidden />
							Questions
						</span>
						<div className="flex gap-1.5">
							{[5, 10, 15].map((n) => (
								<button
									key={n}
									type="button"
									onClick={() => setValue("numberOfQuizzes", n)}
									aria-pressed={count === n}
									className={cn(
										"h-7 rounded-md px-3 text-[12.5px] font-medium tabular-nums transition-colors",
										count === n
											? "bg-secondary text-foreground"
											: "text-muted-foreground hover:bg-accent hover:text-foreground",
									)}>
									{n}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{subjectId && (
				<div>
					<div className="mb-3 flex items-center gap-1.5 text-[12px] text-muted-foreground">
						<NoteIcon size={13} strokeWidth={1.5} aria-hidden />
						Notes{" "}
						<span className="text-foreground-faint">
							({noteIds.length} selected)
						</span>
					</div>
					{notesLoading && (
						<div className="space-y-2">
							{[1, 2].map((i) => (
								<div key={i} className="shimmer h-12 rounded-lg bg-muted" />
							))}
						</div>
					)}
					{!notesLoading && notes.length === 0 && (
						<Card className="py-6 text-center text-[13px] text-muted-foreground">
							No notes for this subject yet.
						</Card>
					)}
					{!notesLoading && notes.length > 0 && (
						<div className="max-h-52 space-y-2 overflow-auto">
							{notes.map((n) => {
								const sel = noteIds.includes(n.id);
								return (
									<button
										key={n.id}
										type="button"
										onClick={() => toggleNote(n.id)}
										aria-pressed={sel}
										className={cn(
											"flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
											sel
												? "border-primary bg-accent/40"
												: "border-border-strong hover:bg-accent/25",
										)}>
										<span
											className={cn(
												"grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
												sel
													? "border-primary bg-primary text-primary-foreground"
													: "border-border",
											)}>
											{sel && <CheckIcon size={12} strokeWidth={2.5} />}
										</span>
										<span className="truncate text-[13.5px] font-medium text-foreground">
											{n.title}
										</span>
									</button>
								);
							})}
						</div>
					)}
					{errors.noteIds && (
						<p className="text-[12px] text-destructive">Select at least one note.</p>
					)}
				</div>
			)}

			<div className="flex items-center justify-between border-t border-border-strong pt-5">
				<span className="text-[11px] tabular-nums text-foreground-faint">
					{noteIds.length} note{noteIds.length === 1 ? "" : "s"} selected
				</span>
				<Button type="submit" disabled={isPending}>
					<SummaryIcon size={15} strokeWidth={1.5} />
					Generate
				</Button>
			</div>
		</form>
	);
}
