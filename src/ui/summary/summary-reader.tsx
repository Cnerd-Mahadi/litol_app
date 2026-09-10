"use client";

import { Menu } from "@/ui/shared/menu";
import { fmtDate } from "@/lib/time";
import { BackIcon, DeleteIcon, EditIcon, MoreIcon } from "@/ui/shared/icons";
import { useIsDemo } from "@/hooks/use-is-demo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteSummaryDialog } from "./delete-summary-dialog";

export type SummaryItem = {
	id: string;
	title: string;
	description: string | null;
	keywords: string[];
	content: string;
	subjectId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

function SummaryReaderActions({ s }: { s: SummaryItem }) {
	const router = useRouter();
	const [deleteOpen, setDeleteOpen] = useState(false);
	const isDemo = useIsDemo();

	if (isDemo) return null;

	return (
		<>
			<Menu
				trigger={
					<button
						aria-label="Summary actions"
						className="grid size-8 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<MoreIcon size={18} strokeWidth={1.5} aria-hidden />
					</button>
				}
				items={[
					{
						label: "Edit",
						icon: <EditIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => router.push(`/summary/${s.id}/edit`),
					},
					{
						label: "Delete",
						icon: <DeleteIcon size={14} strokeWidth={1.5} aria-hidden />,
						onClick: () => setDeleteOpen(true),
						destructive: true,
					},
				]}
			/>

			<DeleteSummaryDialog
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				id={s.id}
				title={s.title}
				onDeleted={() => router.push("/summary")}
			/>
		</>
	);
}

export function SummaryReader({ s }: { s: SummaryItem }) {
	return (
		<div className="animate-fade-up">
			<div className="mb-5 flex items-center justify-between">
				<Link
					href="/summary"
					className="inline-flex items-center gap-1.5 whitespace-nowrap text-caption text-muted-foreground transition-colors hover:text-foreground">
					<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
					Back to summaries
				</Link>
				<SummaryReaderActions s={s} />
			</div>

			<div className="max-w-180">
				<h1 className="text-display font-semibold text-foreground">{s.title}</h1>
				<div className="mt-2 flex items-center gap-2 text-caption text-muted-foreground">
					<span className="tabular-nums">{fmtDate(s.createdAt)}</span>
					{s.keywords.length > 0 && (
						<>
							<span className="text-foreground-faint" aria-hidden>·</span>
							<span className="tabular-nums">
								{s.keywords.length} {s.keywords.length === 1 ? "keyword" : "keywords"}
							</span>
						</>
					)}
				</div>
				{s.description && (
					<p className="mt-3 text-ui text-muted-foreground">{s.description}</p>
				)}
				{s.keywords.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-1.5">
						{s.keywords.map((k) => (
							<span
								key={k}
								className="inline-flex h-6 items-center whitespace-nowrap rounded-md border border-border px-2 text-caption text-muted-foreground">
								{k}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="mt-8 max-w-180 border-t border-border pt-8">
				<p className="whitespace-pre-wrap text-prose text-foreground">{s.content}</p>
			</div>
		</div>
	);
}
