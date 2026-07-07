"use client";

import { NoteForm } from "@/ui/note/note-form";
import { BackIcon } from "@/ui/shared/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
	const router = useRouter();

	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<Link
				href="/note"
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<BackIcon size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
				Back to notes
			</Link>
			<NoteForm onDone={() => router.push("/note")} />
		</div>
	);
}
