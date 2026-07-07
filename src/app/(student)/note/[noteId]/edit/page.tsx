"use client";

import { useNote } from "@/lib/swr/use-note";
import { NoteForm } from "@/ui/note/note-form";
import { BackIcon, SpinnerIcon } from "@/ui/shared/icons";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditNotePage() {
	const { noteId } = useParams<{ noteId: string }>();
	const router = useRouter();
	const { data: note, isLoading } = useNote(noteId);

	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<Link
				href={`/note/${noteId}`}
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
				Back to note
			</Link>
			{isLoading || !note ? (
				<div className="flex justify-center py-12">
					<SpinnerIcon className="animate-spin text-muted-foreground" />
				</div>
			) : (
				<NoteForm
					initial={{
						id: note.id,
						title: note.title,
						subjectId: note.subjectId,
						description: note.description,
						keywords: note.keywords,
						cues: note.cues.map((c) => ({
							id: c.id,
							cue: c.cue,
							details: c.details,
						})),
					}}
					onDone={() => router.push(`/note/${noteId}`)}
				/>
			)}
		</div>
	);
}
