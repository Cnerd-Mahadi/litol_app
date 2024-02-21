import noteIcon from "@/../public/assets/note.png";
import Image from "next/image";
import { NoteCues } from "./note-cues";

interface NoteProps {
	title: string;
	updated: string;
	cues: {
		id: string;
		key: string;
		details: string;
	}[];
	details: string;
}

export const Note = async ({ title, updated, cues, details }: NoteProps) => {
	return (
		<div className="pt-8 pb-20 w-full max-w-xl mx-auto">
			<div className="flex flex-row gap-3 -ml-4 my-4">
				<Image src={noteIcon} className="w-36" alt="note-icon" />
				<div className="space-y-1 pt-2">
					<h3 className="text-slate-800 font-semibold text-lg">{title}</h3>
					<p className="text-slate-500 font-semibold text-sm">{updated}</p>
				</div>
			</div>
			<p className="my-8 text-slate-500 ml-3 text-sm">{details}</p>
			<NoteCues cues={cues} />
		</div>
	);
};
