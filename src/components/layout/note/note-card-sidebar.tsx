import Link from "next/link";

export interface NoteCardSidebarProps {
	title: string;
	id: string;
	updated: string;
}

export const NoteCardSidebar = ({
	title,
	id,
	updated,
}: NoteCardSidebarProps) => {
	return (
		<Link
			href={{
				pathname: `/note/${id}`,
			}}
			className="flex flex-row gap-4 items-start mb-6 group">
			<div className="p-4 shadow-lg rounded-lg w-full">
				<p className="font-semibold text-gray-600 group-hover:text-blue-500 overflow-ellipsis pb-2">
					{title}
				</p>
				<p className="text-sm text-gray-500 font-semibold">{updated}</p>
			</div>
		</Link>
	);
};
