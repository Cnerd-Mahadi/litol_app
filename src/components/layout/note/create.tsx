import noteImage from "@/../public/assets/note.png";
import Image from "next/image";
import { NoteForm } from "./note-form";

export const CreateNote = () => {
	return (
		<section>
			<Image src={noteImage} alt="note-pic" className="w-60 mx-auto" />
			<h2 className="text-2xl font-semibold text-slate-600 text-center">
				Create New Note
			</h2>
			<div className="mx-auto max-w-lg pt-8 pb-32">
				<NoteForm />
			</div>
		</section>
	);
};
