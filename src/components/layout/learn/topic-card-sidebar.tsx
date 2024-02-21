import Image from "next/image";
import Link from "next/link";

interface TopicCardSidebarProps {
	image: string;
	title: string;
	subjectId: string;
	subject: string;
	id: string;
}

export const TopicCardSidebar = ({
	image,
	title,
	subjectId,
	subject,
	id,
}: TopicCardSidebarProps) => {
	return (
		<Link
			href={{
				pathname: "/learn/content",
				query: {
					subjectId: subjectId,
					topicId: id,
				},
			}}
			className="flex flex-row gap-4 items-start mb-6 group">
			<Image
				src={image}
				alt="topic-pic"
				width={300}
				height={300}
				className="rounded-lg min-w-24 w-24 min-h-16 h-16 object-cover"
			/>
			<div className="space-y-1 w-full">
				<p className="text-sm font-semibold text-gray-600 group-hover:text-blue-500">
					{title}
				</p>
				<p className="text-xs text-gray-500 font-semibold">{subject}</p>
			</div>
		</Link>
	);
};
