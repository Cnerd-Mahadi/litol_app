"use client";

import { deleteSummary } from "@/actions/summary";
import { DeleteButton } from "@/components/ui/delete-button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SummaryCardProps {
	image: string;
	title: string;
	id: string;
	updated: string;
	imageId: string;
}

export const SummaryCard = ({
	image,
	title,
	id,
	updated,
	imageId,
}: SummaryCardProps) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleDelete = async () => {
		setLoading(true);
		await deleteSummary(id, imageId);
		setLoading(false);
		setOpen(false);
		toast({
			title: "Success!",
			description: "Summary deleted successfully!",
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
					pathname: `/summary/${id}`,
				}}
				className="space-y-2 group md:max-w-72 relative">
				<Image
					src={image}
					alt="summary-pic"
					width={512}
					height={512}
					className="rounded-lg w-full h-56 object-cover"
				/>
				<div className="px-2">
					<p className="font-semibold text-gray-600 group-hover:text-blue-500 overflow-ellipsis">
						{title}
					</p>
					<p className="text-sm text-gray-500 font-semibold">{updated}</p>
				</div>
			</Link>
		</div>
	);
};
