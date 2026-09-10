import { CreateNoteButton } from "@/ui/note/create-note-button";
import { NotesGallery } from "@/ui/note/notes-gallery";

export default function NotePage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-10">
			<div className="mb-6 flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="text-heading font-semibold text-foreground">Notes</h1>
					<p className="mt-1 text-caption text-muted-foreground">
						Write notes with cues. Open any note to read it and review its cues.
					</p>
				</div>
				<CreateNoteButton />
			</div>
			<NotesGallery />
		</div>
	);
}
