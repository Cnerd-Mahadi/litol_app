"use client";

import { Menu } from "@/ui/shared/menu";
import { fmtDate } from "@/lib/time";
import { BackIcon, DeleteIcon, EditIcon, MoreIcon } from "@/ui/shared/icons";
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
					className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
					<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
					Back to gallery
				</Link>
				<SummaryReaderActions s={s} />
			</div>

			<div className="max-w-180">
				<div className="text-[11px] tabular-nums text-foreground-faint">
					{fmtDate(s.createdAt)}
				</div>
				<h1 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-[26px]">
					{s.title}
				</h1>

				{s.keywords.length > 0 && (
					<div className="mt-5 flex flex-wrap gap-2">
						{s.keywords.map((k) => (
							<span
								key={k}
								className="inline-flex h-7 items-center whitespace-nowrap rounded-md border border-border bg-secondary px-3 text-[12.5px] font-medium text-secondary-foreground">
								{k}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="mt-8 max-w-180 border-t border-border pt-8">
				<p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-foreground">
					{s.content}
				</p>
			</div>
		</div>
	);
}
