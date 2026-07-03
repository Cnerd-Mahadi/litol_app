"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createSummary, generateSummaryAction } from "@/actions/summary";
import { GeneratingPanel } from "@/ui/shared/generating-panel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, FileText, Loader2, Sparkles, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";
import { NotesPicker } from "./notes-picker";
import { SummaryEditorModal } from "./summary-editor-modal";

const GENERATING_STEPS = ["Reading notes and cues", "Condensing content", "Extracting key terms"];

const manualFormSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
	keywords: z.array(z.string()),
});
type ManualFormData = z.infer<typeof manualFormSchema>;

export function SummaryCreate() {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const { toast } = useToast();

	const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
	const [maxWords, setMaxWords] = useState(500);
	const [aiPhase, setAiPhase] = useState<"pick" | "generating">("pick");
	const [editorData, setEditorData] = useState<{
		title: string;
		keywords: string[];
		content: string;
	} | null>(null);
	const [kwInput, setKwInput] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<ManualFormData>({
			resolver: zodResolver(manualFormSchema),
			defaultValues: { title: "", content: "", keywords: [] },
		});
	const manKeywords = watch("keywords");
	const manContent = watch("content");

	const { execute: execGenerate } = useAction(generateSummaryAction, {
		onSuccess: ({ data }) => {
			if (data?.summary) {
				setEditorData(data.summary);
				setAiPhase("pick");
			}
		},
		onError: ({ error: e }) => {
			toast({
				title: "Failed to generate summary",
				description: e.serverError,
				variant: "destructive",
			});
			setAiPhase("pick");
		},
	});

	const { execute: execSaveManual, isPending: manSaving } = useAction(
		createSummary,
		{
			onSuccess: ({ data }) => {
				mutate("summaries");
				reset();
				setKwInput("");
				if (data?.summaryId) router.push(`/summary/${data.summaryId}`);
			},
			onError: ({ error: e }) =>
				toast({
					title: "Failed to save summary",
					description: e.serverError,
					variant: "destructive",
				}),
		},
	);

	const generate = () => {
		if (selectedNoteIds.length === 0) return;
		setAiPhase("generating");
		execGenerate({ noteIds: selectedNoteIds, maxWords });
	};

	const addManKw = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && kwInput.trim()) {
			e.preventDefault();
			const kw = kwInput.trim();
			if (!manKeywords.includes(kw)) setValue("keywords", [...manKeywords, kw]);
			setKwInput("");
		}
	};

	const onManSubmit = (data: ManualFormData) => {
		execSaveManual({
			title: data.title,
			content: data.content,
			keywords: data.keywords,
		});
	};

	if (aiPhase === "generating") {
		return (
			<GeneratingPanel
				Icon={Sparkles}
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
		);
	}

	return (
		<>
			{editorData && (
				<SummaryEditorModal
					initial={editorData}
					noteIds={selectedNoteIds}
					onClose={() => setEditorData(null)}
				/>
			)}

			<Tabs defaultValue="ai" className="mx-auto max-w-[640px]">
				<div className="flex justify-center">
					<TabsList>
						<TabsTrigger value="ai">
							<Sparkles size={14} strokeWidth={1.5} aria-hidden />
							Generate with AI
						</TabsTrigger>
						<TabsTrigger value="manual">
							<FileText size={14} strokeWidth={1.5} aria-hidden />
							Write manually
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="ai" className="mt-4">
					<div className="space-y-5 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card)">
						<div>
							<div className="text-[13px] font-medium text-foreground">
								Select notes to summarize
							</div>
							<div className="mt-0.5 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
								{selectedNoteIds.length} selected
							</div>
						</div>
						<NotesPicker
							selectedIds={selectedNoteIds}
							onToggle={(id) =>
								setSelectedNoteIds((ids) =>
									ids.includes(id)
										? ids.filter((x) => x !== id)
										: [...ids, id],
								)
							}
						/>
						<div className="space-y-2">
							<Label>
								Max words{" "}
								<span className="tabular-nums text-muted-foreground">
									{maxWords}
								</span>
							</Label>
							<input
								type="range"
								min={100}
								max={2000}
								step={100}
								value={maxWords}
								onChange={(e) => setMaxWords(Number(e.target.value))}
								className="w-full accent-(--primary)"
							/>
							<div className="flex justify-between text-[11px] tabular-nums text-foreground-faint">
								<span>100</span>
								<span>2000</span>
							</div>
						</div>
						<Button
							onClick={generate}
							disabled={selectedNoteIds.length === 0}
							className="h-11 w-full">
							<Sparkles size={16} strokeWidth={1.5} />
							Generate summary
						</Button>
					</div>
				</TabsContent>

				<TabsContent value="manual" className="mt-4">
					<form
						onSubmit={handleSubmit(onManSubmit)}
						className="space-y-5 rounded-lg border border-border bg-card p-5 shadow-(--shadow-card)">
						<div className="space-y-2">
							<Label htmlFor="sum-title">Title</Label>
							<Input
								id="sum-title"
								{...register("title")}
								placeholder="e.g. Photosynthesis: light reactions"
							/>
							{errors.title && (
								<p className="text-[12px] text-destructive">Title is required.</p>
							)}
						</div>
						<div className="space-y-2">
							<Label>
								Keywords{" "}
								<span className="text-muted-foreground">
									(press Enter to add)
								</span>
							</Label>
							{manKeywords.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{manKeywords.map((k) => (
										<span
											key={k}
											className="inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-secondary pl-3 pr-1.5 text-[12.5px] font-medium text-secondary-foreground">
											{k}
											<button
												type="button"
												aria-label={`Remove ${k}`}
												onClick={() =>
													setValue(
														"keywords",
														manKeywords.filter((x) => x !== k),
													)
												}
												className="grid size-4 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
												<X size={10} strokeWidth={2} />
											</button>
										</span>
									))}
								</div>
							)}
							<Input
								value={kwInput}
								onChange={(e) => setKwInput(e.target.value)}
								onKeyDown={addManKw}
								placeholder="e.g. Calvin cycle"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="sum-content">Content</Label>
							<Textarea
								id="sum-content"
								{...register("content")}
								rows={10}
								placeholder="Write your summary here"
								className="resize-none leading-relaxed"
							/>
							{errors.content && (
								<p className="text-[12px] text-destructive">Content is required.</p>
							)}
							<div className="text-[11px] tabular-nums text-foreground-faint">
								{manContent.trim().split(/\s+/).filter(Boolean).length} words
							</div>
						</div>
						<div className="flex justify-end pt-1">
							<Button type="submit" disabled={manSaving}>
								{manSaving ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<Check size={16} strokeWidth={2} />
								)}
								Save to gallery
							</Button>
						</div>
					</form>
				</TabsContent>
			</Tabs>
		</>
	);
}
