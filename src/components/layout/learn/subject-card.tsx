import Image from "next/image";
import Link from "next/link";

interface SubjectCardProps {
	image: string;
	subject: string;
	id: string;
}

export const SubjectCard = ({ image, subject, id }: SubjectCardProps) => {
	return (
		<Link href={`/learn/${id}`} className="space-y-4 group">
			<Image
				src={image}
				alt="subject-pic"
				width={512}
				height={512}
				className="rounded-lg w-full h-72 object-cover"
			/>
			<p className="font-semibold text-gray-600 px-2 group-hover:text-blue-500">
				{subject}
			</p>
		</Link>
	);
};
