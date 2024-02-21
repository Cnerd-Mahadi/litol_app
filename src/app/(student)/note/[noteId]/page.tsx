import { getNote, getNotes } from "@/actions/note";
import { Note } from "@/components/layout/note";
import { NoteCardSidebar } from "@/components/layout/note/note-card-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export default async function NoteContentPage({
	params,
}: {
	params: { noteId: string };
}) {
	const user = await getCurrentUser();
	const notes = await getNotes(user.id);
	const note = await getNote(params.noteId);

	return (
		<main className="flex flex-row justify-between h-screen">
			<ScrollArea className="h-full w-full px-2 md:px-6">
				<Note
					title={note.title}
					updated={note.updated}
					cues={note.cues}
					details={note.details}
				/>
			</ScrollArea>
			<ScrollArea className="h-full w-full hidden md:block pr-4 py-8 max-w-72">
				<h4 className="text-center text-slate-500 font-semibold pb-6">
					See Recent Contents
				</h4>
				{notes.map((item) => (
					<NoteCardSidebar
						key={item.id}
						id={item.id}
						title={item.title}
						updated={item.updated}
					/>
				))}
			</ScrollArea>
		</main>
	);
}
