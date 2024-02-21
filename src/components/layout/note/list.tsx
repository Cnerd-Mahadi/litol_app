import { getNotes } from "@/actions/note";
import { getCurrentUser } from "@/lib/firebase";
import { Suspense } from "react";
import LoadingBoxes from "../loading/boxes";
import { NoteCard } from "./note-card";

export const NoteGallery = async () => {
	const user = await getCurrentUser();
	const notes = await getNotes(user.id);
	return (
		<Suspense fallback={<LoadingBoxes boxHeight="h-32" />}>
			<section className="py-8 pb-32 px-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16">
				{notes.map((item) => (
					<NoteCard
						key={item.id}
						id={item.id}
						title={item.title}
						updated={item.updated}
					/>
				))}
			</section>
		</Suspense>
	);
};
