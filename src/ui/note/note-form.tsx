"use client";

import { createNote, suggestCueAction, updateNote } from "@/actions/note";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { SubjectSelector } from "@/ui/shared/subject-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AddIcon,
	CheckIcon,
	CloseIcon,
	KeywordsIcon,
	SpinnerIcon,
	SubjectIcon,
	SummaryIcon,
} from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const noteFormSchema = z.object({
	title: z.string().min(1),
	subjectId: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()),
	cues: z.array(
		z.object({
			id: z.string().optional(),
			cue: z.string(),
			details: z.string(),
		}),
	),
});
type NoteFormData = z.infer<typeof noteFormSchema>;

export type NoteFormInitial = {
	id: string;
	title: string;
	subjectId: string;
	description: string | null;
	keywords: string[];
	cues: { id: string; cue: string; details: string }[];
};

export function NoteForm({
	initial,
	onDone,
}: {
	initial?: NoteFormInitial;
	onDone: () => void;
}) {
	const isEdit = !!initial;
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [kwInput, setKwInput] = useState("");
	const [suggesting, setSuggesting] = useState<number | null>(null);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<NoteFormData>({
		resolver: zodResolver(noteFormSchema),
		defaultValues: initial
			? {
					title: initial.title,
					subjectId: initial.subjectId,
					description: initial.description ?? "",
					keywords: initial.keywords,
					cues: initial.cues.length
						? initial.cues.map((c) => ({
								id: c.id,
								cue: c.cue,
								details: c.details,
							}))
						: [{ cue: "", details: "" }],
				}
			: {
					title: "",
					subjectId: "",
					description: "",
					keywords: [],
					cues: [{ cue: "", details: "" }],
				},
	});
	const { fields, append, remove } = useFieldArray({ control, name: "cues" });
	const keywords = watch("keywords");
	const watchedCues = watch("cues");
	const subjectId = watch("subjectId");

	const create = useAction(createNote, {
		onSuccess: () => {
			mutate("notes");
			mutate("dashboard");
			toast({ title: "Note created" });
			onDone();
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const update = useAction(updateNote, {
		onSuccess: () => {
			mutate("notes");
			mutate("dashboard");
			if (initial) mutate(["note", initial.id]);
			toast({ title: "Note updated" });
			onDone();
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const pending = create.isPending || update.isPending;

	const { execute: execSuggest, isPending: suggestPending } = useAction(
		suggestCueAction,
		{
			onSuccess: ({ data }) => {
				if (suggesting !== null && data?.cue)
					setValue(`cues.${suggesting}.cue`, data?.cue ?? "");
				setSuggesting(null);
			},
			onError: ({ error: e }) => {
				setSuggesting(null);
				toast({ title: e.serverError, variant: "destructive" });
			},
		},
	);

	const addKw = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && kwInput.trim()) {
			e.preventDefault();
			const kw = kwInput.trim();
			if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw]);
			setKwInput("");
		}
	};

	const onSubmit = (data: NoteFormData) => {
		const validCues = data.cues.filter((c) => c.cue.trim() && c.details.trim());
		if (isEdit && initial) {
			update.execute({
				id: initial.id,
				title: data.title,
				subjectId: data.subjectId,
				description: data.description?.trim() ? data.description.trim() : null,
				keywords: data.keywords,
				cues: validCues.map((c) => ({
					...(c.id ? { id: c.id } : {}),
					cue: c.cue,
					details: c.details,
				})),
			});
		} else {
			create.execute({
				title: data.title,
				subjectId: data.subjectId,
				description: data.description?.trim() || undefined,
				keywords: data.keywords,
				cues: validCues.map((c) => ({ cue: c.cue, details: c.details })),
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-[1fr_380px]">
				<div className="min-w-0 border-b border-border-strong pb-4">
					<label htmlFor="note-title" className="sr-only">
						Note title
					</label>
					<Input
						id="note-title"
						{...register("title")}
						placeholder="Untitled note"
						className="h-auto w-full border-0 bg-transparent p-0 text-[28px] font-semibold tracking-tight text-foreground shadow-none outline-none placeholder:text-foreground-faint/70 focus-visible:ring-0"
					/>
					{errors.title && (
						<p className="mt-2 text-[12px] text-destructive">
							Title is required.
						</p>
					)}
				</div>
				<div className="hidden items-start justify-end lg:flex">
					<Button
						type="submit"
						size="lg"
						disabled={pending}
						className="shrink-0">
						{pending ? (
							<>
								<SpinnerIcon size={16} className="animate-spin" />
								Saving
							</>
						) : (
							<>
								<CheckIcon size={16} strokeWidth={2} />
								{isEdit ? "Update" : "Save"}
							</>
						)}
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-[1fr_380px]">
				{/* Main column — the note's actual content */}
				<div className="min-w-0 space-y-8">
					<div>
						<label htmlFor="note-desc" className="sr-only">
							Description
						</label>
						<Textarea
							id="note-desc"
							{...register("description")}
							placeholder="Write your notes here…"
							className="min-h-32 w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-[1.85] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0 lg:min-h-64"
						/>
					</div>

					<div className="border-t border-border pt-8">
						<div className="mb-3.5 text-[13px] font-medium text-foreground">
							Cues{" "}
							<span className="font-normal text-muted-foreground">
								(question and answer pairs)
							</span>
						</div>
						<div className="space-y-2.5">
							{fields.map((field, i) => (
								<Card key={field.id} className="group/cue p-4">
									<div className="flex items-center gap-2.5">
										<span className="shrink-0 text-[11px] tabular-nums text-foreground-faint">
											{String(i + 1).padStart(2, "0")}
										</span>
										<Input
											{...register(`cues.${i}.cue`)}
											placeholder="Question / cue"
											className="h-auto flex-1 border-0 bg-transparent p-0 text-[14px] font-medium text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
										/>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													type="button"
													onClick={() => {
														setSuggesting(i);
														execSuggest({
															detail: watchedCues[i]?.details ?? "",
														});
													}}
													disabled={
														!watchedCues[i]?.details?.trim() || suggestPending
													}
													aria-label="Suggest cue from details"
													className="grid size-6 cursor-pointer place-items-center rounded-md text-foreground-faint transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40">
													{suggesting === i && suggestPending ? (
														<SpinnerIcon size={13} className="animate-spin" />
													) : (
														<SummaryIcon size={13} strokeWidth={1.5} />
													)}
												</button>
											</TooltipTrigger>
											<TooltipContent>
												Suggest a cue from the answer
											</TooltipContent>
										</Tooltip>
										<button
											type="button"
											onClick={() => fields.length > 1 && remove(i)}
											aria-label="Remove cue"
											className="grid size-6 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-danger-bg hover:text-danger-text group-hover/cue:opacity-100">
											<CloseIcon size={13} strokeWidth={2} />
										</button>
									</div>
									<Input
										{...register(`cues.${i}.details`)}
										placeholder="Answer / details"
										className="mt-2 h-auto w-full border-0 bg-transparent p-0 pl-6.5 text-[13.5px] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
									/>
								</Card>
							))}
						</div>
						<button
							type="button"
							onClick={() => append({ cue: "", details: "" })}
							className="mt-2.5 flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
							<AddIcon size={14} strokeWidth={1.5} /> Add cue
						</button>
					</div>
				</div>

				{/* Rail — properties, Notion-style inline rows */}
				<div>
					<div className="border-b border-border-strong py-3">
						<div className="flex items-center gap-3">
							<span className="flex w-21 shrink-0 items-center gap-1.5 text-[12px] text-muted-foreground">
								<SubjectIcon size={13} strokeWidth={1.5} aria-hidden />
								Subject
							</span>
							<SubjectSelector
								value={subjectId}
								onChange={(id) =>
									setValue("subjectId", id, { shouldValidate: true })
								}
								className="h-8 flex-1 justify-start gap-1.5 text-[13.5px] font-medium data-placeholder:text-foreground-faint"
							/>
						</div>
						{errors.subjectId && (
							<p className="mt-1.5 text-[12px] text-destructive">
								Subject is required.
							</p>
						)}
					</div>

					<div className="border-b border-border-strong py-3">
						<div className="flex items-start gap-3">
							<span className="flex w-21 shrink-0 items-center gap-1.5 pt-1 text-[12px] text-muted-foreground">
								<KeywordsIcon size={13} strokeWidth={1.5} aria-hidden />
								Keywords
							</span>
							<div className="flex flex-1 flex-wrap items-center gap-1.5">
								{keywords.map((k) => (
									<span
										key={k}
										className="inline-flex h-6 items-center gap-1 rounded-md bg-secondary pl-2 pr-1 text-[12.5px] font-medium text-secondary-foreground">
										{k}
										<button
											type="button"
											aria-label={`Remove ${k}`}
											onClick={() =>
												setValue(
													"keywords",
													keywords.filter((x) => x !== k),
												)
											}
											className="grid size-4 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
											<CloseIcon size={10} strokeWidth={2} />
										</button>
									</span>
								))}
								<Input
									value={kwInput}
									onChange={(e) => setKwInput(e.target.value)}
									onKeyDown={addKw}
									placeholder={keywords.length ? "Add…" : "e.g. hydroxyl group"}
									className="h-auto min-w-25 flex-1 border-0 bg-transparent p-0 py-1 text-[13px] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-border pt-6 lg:hidden">
				<Button
					type="submit"
					size="lg"
					disabled={pending}
					className="w-full">
					{pending ? (
						<>
							<SpinnerIcon size={16} className="animate-spin" />
							Saving
						</>
					) : (
						<>
							<CheckIcon size={16} strokeWidth={2} />
							{isEdit ? "Update" : "Save"}
						</>
					)}
				</Button>
			</div>
		</form>
	);
}
