import { getNotes } from "@/actions/note";
import { getCurrentUser } from "@/lib/firebase";
import { NoteCard } from "./note-card";

export const NoteGallery = async () => {
	const user = await getCurrentUser();
	const notes = await getNotes(user.id);
	return (
		<section className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-8 pb-32">
			{notes.map((item) => (
				<NoteCard
					key={item.id}
					id={item.id}
					title={item.title}
					updated={item.updated}
				/>
			))}
		</section>
	);
};
