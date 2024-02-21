import Image from "next/image";
import Link from "next/link";

export interface SummaryCardSidebarProps {
	image: string;
	title: string;
	id: string;
	updated: string;
}

export const SummaryCardSidebar = ({
	image,
	title,
	id,
	updated,
}: SummaryCardSidebarProps) => {
	return (
		<Link
			href={{
				pathname: `/summary/${id}`,
			}}
			className="flex flex-row gap-4 items-start mb-6 group">
			<Image
				src={image}
				alt="summary-pic"
				width={300}
				height={300}
				className="rounded-lg min-w-24 w-24 min-h-16 h-16 object-cover"
			/>
			<div className="space-y-2 w-full">
				<p className="text-sm font-semibold text-gray-600 group-hover:text-blue-500">
					{title}
				</p>
				<p className="text-xs text-gray-500 font-semibold">{updated}</p>
			</div>
		</Link>
	);
};
