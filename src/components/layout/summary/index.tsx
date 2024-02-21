import summaryIcon from "@/../public/assets/summary.png";
import { SummaryDetails } from "@/components/layout/summary/summary-details";
import { blurImage } from "@/lib/plaiceholder";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface SummaryProps {
	title: string;
	updated: string;
	image: string;
	keywords: string[];
	details: string;
}

export const Summary = async ({
	title,
	updated,
	image,
	keywords,
	details,
}: SummaryProps) => {
	const blur = await blurImage(image);
	return (
		<div className="pt-8 pb-20 w-full max-w-2xl mx-auto">
			<Image
				src={image}
				width={720}
				height={720}
				blurDataURL={blur}
				placeholder="blur"
				alt="summary-image"
				className="w-full max-h-96 object-cover mx-auto rounded-md"
			/>
			<div className="flex flex-row gap-1 -ml-4 my-8">
				<Image src={summaryIcon} className="w-36" alt="summary-icon" />
				<div className="space-y-1 pt-2">
					<h3 className="text-slate-800 font-semibold text-lg">{title}</h3>
					<p className="text-slate-500 font-semibold text-sm">{updated}</p>
				</div>
			</div>
			<div className="flex flex-row gap-4 pl-2 mb-8 flex-wrap">
				{keywords.map((item, index) => (
					<div
						key={index}
						className="flex flex-row justify-center items-center gap-2 px-4 py-1 bg-slate-800 rounded-full font-semibold text-slate-50 min-w-20 text-xs md:text-sm">
						<BookmarkFilledIcon className="size-4" />
						{item.toLocaleLowerCase()}
					</div>
				))}
			</div>
			<div className="w-full pl-2">
				<SummaryDetails details={details} />
			</div>
		</div>
	);
};
