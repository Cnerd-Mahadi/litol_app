import { Skeleton } from "@/components/ui/skeleton";
import Image, { StaticImageData } from "next/image";
import { Suspense } from "react";

interface StatCardProps {
	bg: string;
	title: string;
	title_color: string;
	text: string;
	icon: StaticImageData;
}

export const StatCard = ({
	bg,
	title,
	title_color,
	text,
	icon,
}: StatCardProps) => {
	return (
		<div
			className={`lg:px-10 px-6  flex flex-row justify-between items-center gap-2 ${bg} py-5 rounded-xl w-full`}>
			<div className="flex flex-col justify-between">
				<h3 className={`${title_color} font-semibold text-xl pb-3`}>{title}</h3>
				<Suspense fallback={<Skeleton className="h-5 bg-slate-300" />}>
					<p className={`text-slate-500 text-sm font-semibold`}>
						Total Count: {text}
					</p>
				</Suspense>
			</div>
			<Image src={icon} alt={`stat-icon-${title}`} className="w-12" />
		</div>
	);
};
