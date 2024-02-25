import Image from "next/image";
import Link from "next/link";

export interface TopicCardProps {
	image: string;
	title: string;
	subjectId: string;
	subject: string;
	id: string;
}

export const TopicCard = ({
	image,
	title,
	subjectId,
	subject,
	id,
}: TopicCardProps) => {
	return (
		<Link
			href={{
				pathname: "/learn/content",
				query: {
					subjectId: subjectId,
					topicId: id,
				},
			}}
			className="space-y-2 group">
			<Image
				src={image}
				alt="topic-pic"
				width={512}
				height={512}
				className="rounded-lg w-full h-60 object-cover"
			/>
			<div className="px-2">
				<p className="font-semibold text-gray-500 group-hover:text-blue-500 overflow-ellipsis">
					{title}
				</p>
				<p className="text-sm text-gray-400 font-medium">{subject}</p>
			</div>
		</Link>
	);
};
