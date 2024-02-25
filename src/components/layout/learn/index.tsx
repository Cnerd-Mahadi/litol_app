import { textRenderOptions } from "@/lib/contentful/rich-text-options";
import { getCurrentUser } from "@/lib/firebase";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BiCalendar } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { FeynmanButton } from "./feynman-button";

interface LearnProps {
	id: string;
	title: string;
	published: string;
	author: string;
	authorImage: string;
	image: string;
	subject: string;
	details: any;
	useful: any;
}

export const Learn = async ({
	id,
	title,
	published,
	author,
	authorImage,
	image,
	subject,
	details,
	useful,
}: LearnProps) => {
	const publishedAt = new Date(Date.parse(published));
	const user = await getCurrentUser();
	return (
		<div className="pt-8 pb-20 w-full max-w-3xl mx-auto">
			<h2 className="bg-gradient-to-b from-slate-400 to-slate-800 text-transparent bg-clip-text font-semibold text-3xl text-center pb-8">
				{title}
			</h2>
			<Image
				src={image}
				width={720}
				height={720}
				alt="content-image"
				className="w-full max-h-[24rem] object-cover mx-auto rounded-md"
			/>
			<div className="hidden md:flex flex-row gap-6 gap-y-3 max-w-3xl px-2 pt-6 md:pb-8 pb-2">
				<div className="flex flex-row gap-2 md:justify-center justify-start items-center">
					<Image
						src={authorImage}
						width={100}
						height={100}
						alt="author-image"
						className="w-5 rounded-full"
					/>
					<p className="text-slate-600 text-sm font-semibold">{author}</p>
				</div>
				<div className="sm:flex hidden flex-row gap-2 md:justify-center justify-start items-center">
					<BiCalendar size={20} className="text-blue-500" />
					<p className="text-blue-600 text-sm font-semibold">
						{publishedAt.toDateString()}
					</p>
				</div>
				<div className="sm:flex hidden flex-row gap-2 items-center justify-center">
					<FiBook size={19} className="text-slate-600" />
					<p className="text-slate-400 text-sm font-semibold">{subject}</p>
				</div>
			</div>
			<div className="md:px-2">
				{documentToReactComponents(details, textRenderOptions)}
			</div>
			<div className="md:px-2">
				{documentToReactComponents(useful, textRenderOptions)}
			</div>
			<div className="mt-8 flex justify-center">
				<FeynmanButton id={id} user={user} />
			</div>
		</div>
	);
};
