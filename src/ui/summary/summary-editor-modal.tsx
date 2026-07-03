"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createSummary } from "@/actions/summary";
import { IconChip } from "@/ui/shared/icon-chip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Sparkles, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const editorFormSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
	keywords: z.array(z.string()),
});
type EditorFormData = z.infer<typeof editorFormSchema>;

export function SummaryEditorModal({
	initial,
	noteIds,
	onClose,
}: {
	initial: { title: string; keywords: string[]; content: string };
	noteIds: string[];
	onClose: () => void;
}) {
	const router = useRouter();
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [kwInput, setKwInput] = useState("");

	const { register, handleSubmit, watch, setValue } = useForm<EditorFormData>({
		resolver: zodResolver(editorFormSchema),
		defaultValues: {
			title: initial.title,
			content: initial.content,
			keywords: initial.keywords,
		},
	});
	const keywords = watch("keywords");
	const content = watch("content");

	const { execute: execSave, isPending } = useAction(createSummary, {
		onSuccess: ({ data }) => {
			mutate("summaries");
			if (data?.summaryId) router.push(`/summary/${data.summaryId}`);
		},
		onError: ({ error: e }) =>
			toast({
				title: "Failed to save summary",
				description: e.serverError,
				variant: "destructive",
			}),
	});

	const addKw = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && kwInput.trim()) {
			e.preventDefault();
			const kw = kwInput.trim();
			if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw]);
			setKwInput("");
		}
	};

	const onSubmit = (data: EditorFormData) => {
		execSave({
			title: data.title,
			content: data.content,
			keywords: data.keywords,
			noteIds,
		});
	};

	const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

	return (
		<Dialog open onOpenChange={(o) => !o && onClose()}>
			<DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
				<DialogHeader className="flex flex-row items-center gap-2.5 border-b border-border px-5 py-4 text-left sm:px-6">
					<IconChip Icon={Sparkles} color="violet" size={28} />
					<DialogTitle className="text-[14px] font-medium">
						Review and save summary
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex min-h-0 flex-1 flex-col">
					<div className="flex-1 space-y-5 overflow-auto p-5 sm:p-6">
						<div className="space-y-2">
							<Label htmlFor="ed-title">Title</Label>
							<Input
								id="ed-title"
								{...register("title")}
								className="h-11 text-[15px] font-medium"
								placeholder="Summary title"
							/>
						</div>

						<div className="space-y-2">
							<Label>
								Keywords{" "}
								<span className="text-muted-foreground">
									(press Enter to add)
								</span>
							</Label>
							{keywords.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{keywords.map((k) => (
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
														keywords.filter((x) => x !== k),
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
								onKeyDown={addKw}
								placeholder="Add keyword"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="ed-content">Content</Label>
							<Textarea
								id="ed-content"
								{...register("content")}
								rows={16}
								className="resize-none leading-relaxed"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-border px-6 py-4">
						<span className="text-[11px] tabular-nums text-foreground-faint">
							{wordCount} words
						</span>
						<div className="flex gap-2">
							<Button type="button" variant="ghost" onClick={onClose}>
								Discard
							</Button>
							<Button type="submit" disabled={isPending}>
								{isPending ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<Check size={16} strokeWidth={2} />
								)}
								Save to gallery
							</Button>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
