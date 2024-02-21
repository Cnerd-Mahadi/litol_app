"use client";

import { deleteNote } from "@/actions/note";
import { DeleteButton } from "@/components/ui/delete-button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface NoteCardProps {
	title: string;
	id: string;
	updated: string;
}

export const NoteCard = ({ updated, title, id }: NoteCardProps) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleDelete = async () => {
		setLoading(true);
		await deleteNote(id);
		setLoading(false);
		setOpen(false);
		toast({
			title: "Success!",
			description: "Note deleted successfully!",
		});
		router.refresh();
	};

	return (
		<div className="relative">
			<DeleteButton
				className="top-4 right-4"
				loading={loading}
				open={open}
				setOpen={setOpen}
				handleDelete={handleDelete}
			/>
			<Link
				href={{
					pathname: `/note/${id}`,
				}}
				className="group">
				<div className="px-6 py-6 shadow-lg rounded-lg">
					<p className="font-semibold text-gray-600 group-hover:text-blue-500 overflow-ellipsis pb-2">
						{title}
					</p>
					<p className="text-sm text-gray-500 font-semibold">{updated}</p>
				</div>
			</Link>
		</div>
	);
};
