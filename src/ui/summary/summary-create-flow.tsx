"use client";

import { createSummary, generateSummaryAction } from "@/actions/summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GeneratingPanel } from "@/ui/shared/generating-panel";
import { SubjectSelector } from "@/ui/shared/subject-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AdjustIcon,
	CheckIcon,
	CloseIcon,
	DescriptionIcon,
	KeywordsIcon,
	NoteIcon,
	SpinnerIcon,
	SubjectIcon,
	SummaryIcon,
} from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { NotesPicker } from "./notes-picker";

const GENERATING_STEPS = [
	"Reading notes and cues",
	"Condensing content",
	"Extracting key terms",
];

const contentSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	content: z.string().min(1),
	keywords: z.array(z.string()),
});
type ContentData = z.infer<typeof contentSchema>;

function ContentForm({
	defaults,
	saving,
	onSubmit,
}: {
	defaults: ContentData;
	saving: boolean;
	onSubmit: (d: ContentData) => void;
}) {
	const [kwInput, setKwInput] = useState("");
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ContentData>({
		resolver: zodResolver(contentSchema),
		defaultValues: defaults,
	});
	const keywords = watch("keywords");

	const addKw = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && kwInput.trim()) {
			e.preventDefault();
			const kw = kwInput.trim();
			if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw]);
			setKwInput("");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-[1fr_380px]">
				<div className="min-w-0 border-b border-border-strong pb-4">
					<label htmlFor="sum-title" className="sr-only">
						Title
					</label>
					<Input
						id="sum-title"
						{...register("title")}
						placeholder="Untitled summary"
						className="h-auto w-full border-0 bg-transparent p-0 text-[28px] font-semibold tracking-tight text-foreground shadow-none outline-none placeholder:text-foreground-faint/70 focus-visible:ring-0"
					/>
					{errors.title && (
						<p className="mt-2 text-[12px] text-destructive">Title is required.</p>
					)}
				</div>
				<div className="hidden items-start justify-end lg:flex">
					<Button type="submit" size="lg" disabled={saving} className="shrink-0">
						{saving ? (
							<SpinnerIcon size={16} className="animate-spin" />
						) : (
							<CheckIcon size={16} strokeWidth={2} />
						)}
						Save
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-[1fr_380px]">
				<div className="min-w-0 space-y-8">
					<div className="border-b border-border-strong pb-6">
						<label htmlFor="sum-content" className="sr-only">
							Content
						</label>
						<Textarea
							id="sum-content"
							{...register("content")}
							placeholder="Write your summary here…"
							className="min-h-40 w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-[1.85] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0 lg:min-h-125"
						/>
						{errors.content && (
							<p className="text-[12px] text-destructive">Content is required.</p>
						)}
					</div>
				</div>

				<div>
					<div className="border-b border-border-strong py-3">
						<div className="flex items-start gap-3">
							<span className="flex w-21 shrink-0 items-center gap-1.5 pt-1 text-[12px] text-muted-foreground">
								<DescriptionIcon size={13} strokeWidth={1.5} aria-hidden />
								Description
							</span>
							<Textarea
								{...register("description")}
								placeholder="Optional"
								rows={2}
								className="min-h-0 flex-1 resize-none border-0 bg-transparent p-0 text-[13.5px] leading-relaxed text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
							/>
						</div>
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
									placeholder={keywords.length ? "Add…" : "e.g. Calvin cycle"}
									className="h-auto min-w-25 flex-1 border-0 bg-transparent p-0 py-1 text-[13px] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-border pt-6 lg:hidden">
				<Button type="submit" size="lg" disabled={saving} className="w-full">
					{saving ? (
						<SpinnerIcon size={16} className="animate-spin" />
					) : (
						<CheckIcon size={16} strokeWidth={2} />
					)}
					Save
				</Button>
			</div>
		</form>
	);
}

export function SummaryCreateFlow({ onDone }: { onDone: () => void }) {
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [subjectId, setSubjectId] = useState("");
	const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
	const [maxWords, setMaxWords] = useState(500);
	const [phase, setPhase] = useState<"choose" | "generating" | "review">(
		"choose",
	);
	const [aiResult, setAiResult] = useState<ContentData | null>(null);

	const save = useAction(createSummary, {
		onSuccess: () => {
			mutate("summaries");
			mutate("dashboard");
			toast({ title: "Summary saved" });
			onDone();
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const { execute: execGenerate } = useAction(generateSummaryAction, {
		onSuccess: ({ data }) => {
			if (data?.summary) {
				setAiResult({
					title: data.summary.title,
					description: "",
					keywords: data.summary.keywords,
					content: data.summary.content,
				});
				setPhase("review");
			} else {
				setPhase("choose");
			}
		},
		onError: ({ error: e }) => {
			toast({ title: e.serverError, variant: "destructive" });
			setPhase("choose");
		},
	});

	const generate = () => {
		if (selectedNoteIds.length === 0) return;
		setPhase("generating");
		execGenerate({ noteIds: selectedNoteIds, maxWords });
	};

	if (phase === "generating") {
		return (
			<div className="max-w-180">
				<GeneratingPanel
					Icon={SummaryIcon}
					color="violet"
					heading="Generating summary"
					subtitle={
						<>
							from {selectedNoteIds.length} note
							{selectedNoteIds.length === 1 ? "" : "s"}
						</>
					}
					steps={GENERATING_STEPS}
					dwell={[1800, 3000]}
				/>
			</div>
		);
	}

	if (phase === "review" && aiResult) {
		return (
			<ContentForm
				defaults={aiResult}
				saving={save.isPending}
				onSubmit={(d) =>
					save.execute({
						title: d.title,
						description: d.description?.trim() || undefined,
						content: d.content,
						keywords: d.keywords,
						noteIds: selectedNoteIds,
					})
				}
			/>
		);
	}

	return (
		<Tabs defaultValue="ai">
			<TabsList>
				<TabsTrigger value="ai">
					<SummaryIcon size={14} strokeWidth={1.5} aria-hidden />
					Generate with AI
				</TabsTrigger>
				<TabsTrigger value="manual">
					<NoteIcon size={14} strokeWidth={1.5} aria-hidden />
					Write manually
				</TabsTrigger>
			</TabsList>

			<TabsContent value="ai" className="mt-5 space-y-6">
				<div>
					<div className="flex items-center gap-3">
						<span className="flex w-28 shrink-0 items-center gap-1.5 text-[12px] text-muted-foreground">
							<SubjectIcon size={13} strokeWidth={1.5} aria-hidden />
							Subject
						</span>
						<SubjectSelector
							value={subjectId}
							onChange={(id) => {
								setSubjectId(id);
								setSelectedNoteIds([]);
							}}
							placeholder="Select a subject"
							manageable={false}
							className="h-8 flex-1 justify-start gap-1.5 text-[13.5px] font-medium data-placeholder:text-foreground-faint"
						/>
					</div>
				</div>

				<div>
					<div className="mb-3 flex items-center gap-1.5 text-[12px] text-muted-foreground">
						<NoteIcon size={13} strokeWidth={1.5} aria-hidden />
						Notes{" "}
						<span className="text-foreground-faint">
							({selectedNoteIds.length} selected)
						</span>
					</div>
					<NotesPicker
						subjectId={subjectId}
						selectedIds={selectedNoteIds}
						onToggle={(id) =>
							setSelectedNoteIds((ids) =>
								ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
							)
						}
					/>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-strong pt-5">
					<div className="flex min-w-55 flex-1 items-center gap-3">
						<span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[12px] text-muted-foreground">
							<AdjustIcon size={13} strokeWidth={1.5} aria-hidden />
							Max words
						</span>
						<Slider
							value={[maxWords]}
							onValueChange={([v]) => setMaxWords(v)}
							min={100}
							max={2000}
							step={100}
							className="flex-1"
						/>
						<span className="w-10 shrink-0 text-right text-[12px] tabular-nums text-foreground-faint">
							{maxWords}
						</span>
					</div>

					<Button onClick={generate} disabled={selectedNoteIds.length === 0}>
						<SummaryIcon size={15} strokeWidth={1.5} />
						Generate
					</Button>
				</div>
			</TabsContent>

			<TabsContent value="manual" className="mt-5">
				<ContentForm
					defaults={{ title: "", description: "", content: "", keywords: [] }}
					saving={save.isPending}
					onSubmit={(d) =>
						save.execute({
							title: d.title,
							description: d.description?.trim() || undefined,
							content: d.content,
							keywords: d.keywords,
						})
					}
				/>
			</TabsContent>
		</Tabs>
	);
}
