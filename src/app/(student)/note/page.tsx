import { IconChip } from "@/ui/shared/icon-chip";
import { CreateNoteButton } from "@/ui/note/create-note-button";
import { NotesGallery } from "@/ui/note/notes-gallery";
import { NoteIcon } from "@/ui/shared/icons";

export default function NotePage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
				<div className="flex items-center gap-3.5 sm:items-start">
					<IconChip Icon={NoteIcon} color="blue" size={44} tone="accent" />
					<div>
						<h1 className="text-[20px] font-semibold leading-none tracking-[-0.01em] text-foreground sm:text-[24px]">
							Notes
						</h1>
						<p className="mt-2 hidden max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:block">
							Write notes with cues. Click any note to read through it and
							review your cues.
						</p>
					</div>
				</div>
				<CreateNoteButton />
			</div>
			<NotesGallery />
		</div>
	);
}
