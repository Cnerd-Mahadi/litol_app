"use client";

import { updateSummary } from "@/actions/summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckIcon,
	CloseIcon,
	DescriptionIcon,
	KeywordsIcon,
	SpinnerIcon,
} from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { z } from "zod";

const editSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	keywords: z.array(z.string()),
	content: z.string().min(1),
});
type EditData = z.infer<typeof editSchema>;

export type SummaryEditInitial = {
	id: string;
	title: string;
	description: string | null;
	keywords: string[];
	content: string;
};

export function SummaryEditForm({
	summary,
	onDone,
}: {
	summary: SummaryEditInitial;
	onDone: () => void;
}) {
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [kwInput, setKwInput] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<EditData>({
		resolver: zodResolver(editSchema),
		defaultValues: {
			title: summary.title,
			description: summary.description ?? "",
			keywords: summary.keywords,
			content: summary.content,
		},
	});
	const keywords = watch("keywords");

	const { execute, isPending } = useAction(updateSummary, {
		onSuccess: () => {
			mutate("summaries");
			mutate("dashboard");
			mutate(["summary", summary.id]);
			toast({ title: "Summary updated" });
			onDone();
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const addKw = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && kwInput.trim()) {
			e.preventDefault();
			const kw = kwInput.trim();
			if (!keywords.includes(kw)) setValue("keywords", [...keywords, kw]);
			setKwInput("");
		}
	};

	const onSubmit = (data: EditData) => {
		execute({
			id: summary.id,
			title: data.title,
			description: data.description?.trim() ? data.description.trim() : null,
			keywords: data.keywords,
			content: data.content,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-[1fr_380px]">
				<div className="min-w-0 border-b border-border-strong pb-4">
					<label htmlFor="sum-edit-title" className="sr-only">
						Title
					</label>
					<Input
						id="sum-edit-title"
						{...register("title")}
						className="h-auto w-full border-0 bg-transparent p-0 text-[28px] font-semibold tracking-tight text-foreground shadow-none outline-none placeholder:text-foreground-faint/70 focus-visible:ring-0"
					/>
					{errors.title && (
						<p className="mt-2 text-[12px] text-destructive">Title is required.</p>
					)}
				</div>
				<div className="hidden items-start justify-end lg:flex">
					<Button type="submit" size="lg" disabled={isPending} className="shrink-0">
						{isPending ? (
							<SpinnerIcon size={16} className="animate-spin" />
						) : (
							<CheckIcon size={16} strokeWidth={2} />
						)}
						Update
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-[1fr_380px]">
				<div className="min-w-0 space-y-8">
					<div className="border-b border-border-strong pb-6">
						<label htmlFor="sum-edit-content" className="sr-only">
							Content
						</label>
						<Textarea
							id="sum-edit-content"
							{...register("content")}
							className="min-h-40 w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-[1.85] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0 lg:min-h-110"
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
									placeholder={keywords.length ? "Add…" : "Add keyword"}
									className="h-auto min-w-25 flex-1 border-0 bg-transparent p-0 py-1 text-[13px] text-foreground shadow-none outline-none placeholder:text-foreground-faint focus-visible:ring-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border-t border-border pt-6 lg:hidden">
				<Button type="submit" size="lg" disabled={isPending} className="w-full">
					{isPending ? (
						<SpinnerIcon size={16} className="animate-spin" />
					) : (
						<CheckIcon size={16} strokeWidth={2} />
					)}
					Update
				</Button>
			</div>
		</form>
	);
}
