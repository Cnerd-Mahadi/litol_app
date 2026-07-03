"use client";

import { createNote, suggestCueAction } from "@/actions/note";
import { createSubject } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SubjectSelector } from "@/ui/shared/subject-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Plus, Sparkles, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const noteFormSchema = z.object({
	title: z.string().min(1),
	subjectId: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()),
	cues: z.array(z.object({ cue: z.string(), details: z.string() })),
});
type NoteFormData = z.infer<typeof noteFormSchema>;

export function NoteCreate() {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [showNewSubject, setShowNewSubject] = useState(false);
	const [newSubjectName, setNewSubjectName] = useState("");
	const [kwInput, setKwInput] = useState("");
	const [suggesting, setSuggesting] = useState<number | null>(null);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<NoteFormData>({
		resolver: zodResolver(noteFormSchema),
		defaultValues: {
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
	const filledCues = watchedCues.filter((c) => c.cue.trim()).length;

	const { execute: execCreate, isPending: createPending } = useAction(
		createNote,
		{
			onSuccess: ({ data }) => {
				mutate("notes");
				reset();
				if (data?.noteId) router.push(`/note/${data.noteId}`);
			},
			onError: ({ error: e }) =>
				toast({
					title: "Failed to save note",
					description: e.serverError,
					variant: "destructive",
				}),
		},
	);

	const { execute: execSubject, isPending: subjectPending } = useAction(
		createSubject,
		{
			onSuccess: () => {
				mutate("subjects");
				toast({ title: "Subject created" });
				setNewSubjectName("");
				setShowNewSubject(false);
			},
			onError: ({ error: e }) =>
				toast({
					title: "Failed to create subject",
					description: e.serverError,
					variant: "destructive",
				}),
		},
	);

	const { execute: execSuggest, isPending: suggestPending } = useAction(
		suggestCueAction,
		{
			onSuccess: ({ data }) => {
				if (suggesting !== null && data?.cue)
					setValue(`cues.${suggesting}.cue`, data.cue);
				setSuggesting(null);
			},
			onError: () => setSuggesting(null),
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
		execCreate({
			title: data.title,
			subjectId: data.subjectId,
			description: data.description?.trim() || undefined,
			keywords: data.keywords,
			cues: validCues as { cue: string; details: string }[],
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mx-auto max-w-[640px] space-y-5 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card)">
				{/* Title */}
				<div className="space-y-2">
					<Label htmlFor="note-title">Note title</Label>
					<Input
						id="note-title"
						{...register("title")}
						placeholder="e.g. Organic chemistry: functional groups"
					/>
					{errors.title && (
						<p className="text-[12px] text-destructive">Title is required.</p>
					)}
				</div>

				{/* Subject */}
				<div className="space-y-2">
					<Label>Subject</Label>
					{showNewSubject ? (
						<div className="flex gap-2">
							<Input
								value={newSubjectName}
								onChange={(e) => setNewSubjectName(e.target.value)}
								onKeyDown={(e) =>
									e.key === "Enter" &&
									newSubjectName.trim() &&
									execSubject({ name: newSubjectName.trim() })
								}
								placeholder="Subject name"
								autoFocus
							/>
							<Button
								type="button"
								onClick={() =>
									newSubjectName.trim() &&
									execSubject({ name: newSubjectName.trim() })
								}
								disabled={!newSubjectName.trim() || subjectPending}>
								{subjectPending ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									"Create"
								)}
							</Button>
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setShowNewSubject(false);
									setNewSubjectName("");
								}}>
								Cancel
							</Button>
						</div>
					) : (
						<div className="flex gap-2">
							<SubjectSelector
								value={subjectId}
								onChange={(id) =>
									setValue("subjectId", id, { shouldValidate: true })
								}
							/>
							<Button
								type="button"
								variant="secondary"
								onClick={() => setShowNewSubject(true)}
								className="whitespace-nowrap">
								<Plus size={16} strokeWidth={1.5} />
								New
							</Button>
						</div>
					)}
					{errors.subjectId && (
						<p className="text-[12px] text-destructive">Subject is required.</p>
					)}
				</div>

				{/* Description */}
				<div className="space-y-2">
					<Label htmlFor="note-desc">
						Description{" "}
						<span className="text-muted-foreground">(optional)</span>
					</Label>
					<Textarea
						id="note-desc"
						{...register("description")}
						rows={4}
						placeholder="Write your notes here"
						className="resize-none leading-relaxed"
					/>
				</div>

				{/* Keywords */}
				<div className="space-y-2">
					<Label>
						Keywords{" "}
						<span className="text-muted-foreground">(press Enter to add)</span>
					</Label>
					{keywords.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{keywords.map((k) => (
								<span
									key={k}
									className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-secondary pl-3 pr-1.5 text-[13px] font-medium text-secondary-foreground">
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
										<X size={11} strokeWidth={2} />
									</button>
								</span>
							))}
						</div>
					)}
					<Input
						value={kwInput}
						onChange={(e) => setKwInput(e.target.value)}
						onKeyDown={addKw}
						placeholder="e.g. hydroxyl group"
					/>
				</div>

				{/* Cues */}
				<div className="pt-1">
					<div className="mb-3">
						<div className="text-[13px] font-medium text-foreground">
							Cues{" "}
							<span className="font-normal text-muted-foreground">
								(question and answer pairs)
							</span>
						</div>
						<div className="mt-0.5 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
							{filledCues} cue{filledCues === 1 ? "" : "s"}
						</div>
					</div>
					<div className="space-y-2.5">
						{fields.map((field, i) => (
							<div
								key={field.id}
								className="group/cue rounded-lg border border-border bg-card p-3">
								<div className="flex items-center gap-2.5">
									<span className="shrink-0 text-[11px] tabular-nums text-foreground-faint">
										{String(i + 1).padStart(2, "0")}
									</span>
									<input
										{...register(`cues.${i}.cue`)}
										placeholder="Question / cue"
										className="flex-1 bg-transparent text-[13.5px] font-medium text-foreground placeholder:text-foreground-faint outline-none"
									/>
									<button
										type="button"
										onClick={() => {
											setSuggesting(i);
											execSuggest({ detail: watchedCues[i]?.details ?? "" });
										}}
										disabled={
											!watchedCues[i]?.details?.trim() || suggestPending
										}
										aria-label="Suggest cue from details"
										className="grid size-6 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40">
										{suggesting === i && suggestPending ? (
											<Loader2 size={13} className="animate-spin" />
										) : (
											<Sparkles size={13} strokeWidth={1.5} />
										)}
									</button>
									<button
										type="button"
										onClick={() => fields.length > 1 && remove(i)}
										aria-label="Remove cue"
										className="grid size-6 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-danger-bg hover:text-danger-text group-hover/cue:opacity-100">
										<X size={13} strokeWidth={2} />
									</button>
								</div>
								<input
									{...register(`cues.${i}.details`)}
									placeholder="Answer / details"
									className="mt-1.5 w-full bg-transparent pl-[26px] text-[13px] text-muted-foreground placeholder:text-foreground-faint outline-none"
								/>
							</div>
						))}
					</div>
					<button
						type="button"
						onClick={() => append({ cue: "", details: "" })}
						className="mt-2.5 flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
						<Plus size={14} strokeWidth={1.5} /> Add cue
					</button>
				</div>

				<div className="-mx-5 flex items-center justify-between border-t border-border px-5 pt-4">
					<span className="whitespace-nowrap text-[11px] tabular-nums text-foreground-faint">
						{filledCues} cue{filledCues === 1 ? "" : "s"} · subject required
					</span>
					<Button type="submit" disabled={createPending}>
						{createPending ? (
							<>
								<Loader2 size={16} className="animate-spin" />
								Saving
							</>
						) : (
							<>
								<Check size={16} strokeWidth={2} />
								Save note
							</>
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}
