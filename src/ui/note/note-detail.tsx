"use client";

import { Card } from "@/components/ui/card";
import { useNote } from "@/lib/swr/use-note";
import { BackIcon } from "@/ui/shared/icons";
import Link from "next/link";
import { NoteReader } from "./note-reader";

function BackLink() {
	return (
		<Link
			href="/note"
			className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
			<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
			Back to notes
		</Link>
	);
}

function NoteDetailSkeleton() {
	return (
		<div>
			<div className="shimmer mb-5 h-4 w-24 rounded bg-muted" />
			<div className="max-w-180 space-y-3">
				<div className="shimmer h-6 w-20 rounded-md bg-muted" />
				<div className="shimmer h-7 w-2/3 rounded-md bg-muted" />
			</div>
			<div className="mt-8 max-w-180 space-y-2.5">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="shimmer h-12 rounded-lg bg-muted" />
				))}
			</div>
		</div>
	);
}

function NotFound() {
	return (
		<div className="max-w-180">
			<BackLink />
			<Card className="py-16 text-center shadow-(--shadow-card)">
				<h3 className="text-[15px] font-medium text-foreground">Note not found</h3>
				<p className="mt-1 text-[13px] text-muted-foreground">
					It may have been deleted.
				</p>
			</Card>
		</div>
	);
}

export function NoteDetail({ id }: { id: string }) {
	const { data: note, isLoading } = useNote(id);

	if (isLoading) return <NoteDetailSkeleton />;
	if (!note) return <NotFound />;
	return <NoteReader note={note} />;
}
