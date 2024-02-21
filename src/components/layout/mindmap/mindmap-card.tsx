"use client";

import mindmapIcon from "@/../public/assets/mindmap.png";
import { deleteMindMap } from "@/actions/mindmap";
import { DeleteButton } from "@/components/ui/delete-button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface MindMapCardProps {
	title: string;
	id: string;
	updated: string;
}

export const MindMapCard = ({ updated, title, id }: MindMapCardProps) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleDelete = async () => {
		setLoading(true);
		await deleteMindMap(id);
		setLoading(false);
		setOpen(false);
		toast({
			title: "Success!",
			description: "Mindmap deleted successfully!",
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
					pathname: `/mindmap/id/${id}`,
				}}
				className="group">
				<div className="px-6 py-6 shadow-lg rounded-lg ">
					<Image
						src={mindmapIcon}
						alt="mindmap-icon"
						className="w-24 mx-auto mb-4"
					/>

					<p className="font-semibold text-gray-600 group-hover:text-blue-500 overflow-ellipsis pb-2">
						{title}
					</p>
					<p className="text-sm text-gray-500 font-semibold">{updated}</p>
				</div>
			</Link>
		</div>
	);
};
