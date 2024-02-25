import Image, { StaticImageData } from "next/image";

interface FeatureItemProps {
	directionClass: string;
	bg: string;
	image: StaticImageData;
	title: string;
	details: string;
}

export const FeatureItem = ({
	directionClass,
	bg,
	image,
	title,
	details,
}: FeatureItemProps) => {
	return (
		<div
			className={`flex ${directionClass} flex-col justify-center md:items-start items-center py-20 md:rounded-l-xl px-6 ${bg} gap-10`}>
			<Image src={image} alt={`${title}-pic`} className="w-72" />
			<div className="space-y-4">
				<h3 className="text-xl font-semibold text-cyan-900 text-center">
					{title}
				</h3>
				<p className="text-slate-700 leading-8 text-justify tracking-wider max-w-lg text-sm">
					{details}
				</p>
			</div>
		</div>
	);
};
