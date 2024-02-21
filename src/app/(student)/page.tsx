import aboutImage from "@/../public/assets/about.png";
import feynmanImage from "@/../public/assets/feynman.png";
import learnImage from "@/../public/assets/learn.png";
import mindmapStat from "@/../public/assets/mindmap-stat.png";
import mindmapImage from "@/../public/assets/mindmap.png";
import noteStat from "@/../public/assets/note-stat.png";
import noteImage from "@/../public/assets/note.png";
import summaryStat from "@/../public/assets/summary-stat.png";
import summaryImage from "@/../public/assets/summary.png";
import { getContentCount } from "@/actions/dashboard";
import { FeatureItem } from "@/components/layout/dashboard/feature-item";
import { StatCard } from "@/components/layout/dashboard/stat-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/firebase";

import { about, features, formatedName } from "@/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";

const featureItemStyle = [
	{ directionClass: "md:flex-row", image: learnImage },
	{ directionClass: "md:flex-row-reverse", image: summaryImage },
	{ directionClass: "md:flex-row", image: noteImage },
	{ directionClass: "md:flex-row-reverse", image: mindmapImage },
	{ directionClass: "md:flex-row", image: feynmanImage },
];

export default async function DashPage() {
	const user = await getCurrentUser();
	const name = formatedName(user.name);
	const { mindmapCount, noteCount, summaryCount } = await getContentCount(
		user.id
	);
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
	const statStyle = [
		{
			name: "summary",
			bg: "bg-red-50",
			title: "Summary",
			title_color: "text-red-900",
			text: summaryCount,
			icon: summaryStat,
		},
		{
			name: "note",
			bg: "bg-sky-50",
			title: "Note",
			title_color: "text-sky-900",
			text: noteCount,
			icon: noteStat,
		},
		{
			name: "mindmap",
			bg: "bg-indigo-50",
			title: "MindMap",
			title_color: "text-cyan-800",
			text: mindmapCount,
			icon: mindmapStat,
		},
	];
	return (
		<ScrollArea className="w-full h-screen">
			<div className="py-2 md:py-6">
				<section className="px-6 pt-2 lg:flex flex-row justify-between items-center hidden">
					<div className="space-y-2">
						<p className="text-slate-600 font-semibold">{today}</p>
						<h1 className="text-slate-300 font-semibold text-4xl">Dashboard</h1>
					</div>
					<div className="flex flex-row justify-center items-center gap-3">
						<Image
							src={user.image}
							alt="user-pic"
							width={400}
							height={400}
							className="w-14 rounded-full"
						/>
						<div className="space-y-1">
							<h3 className="text-cyan-700 font-semibold text-lg">Welcome</h3>
							<p className="text-slate-500 font-semibold text-sm max-w-xs">
								{name}
							</p>
						</div>
					</div>
				</section>
				<section className="px-6 py-10 flex md:flex-row flex-col justify-between gap-6">
					{statStyle.map((item) => (
						<StatCard
							key={item.name}
							bg={item.bg}
							title={item.title}
							title_color={item.title_color}
							text={item.text.toString()}
							icon={item.icon}
						/>
					))}
				</section>
				<section className="px-6 md:px-10 md:ml-6 pt-0 pb-20 md:py-20 flex md:flex-row flex-col justify-center md:items-start items-center bg-slate-50 md:rounded-l-xl gap-10">
					<Image
						src={aboutImage}
						alt="about-pic"
						className="w-full max-w-sm pt-20"
					/>
					<div className="space-y-6 max-w-xl">
						<h3 className="text-3xl font-semibold text-blue-500 text-center">
							{about.name}
						</h3>
						<p className="text-slate-500 text-sm leading-8 text-justify tracking-wider max-w-5xl">
							{about.details}
						</p>
					</div>
				</section>
				<section className="md:pl-6 my-10">
					<h3 className="text-3xl font-semibold text-blue-500 text-center">
						Key Features
					</h3>
					{features.map((item, index) => (
						<FeatureItem
							key={item.name}
							directionClass={featureItemStyle[index].directionClass}
							bg={index % 2 == 0 ? "" : "bg-violet-50"}
							image={featureItemStyle[index].image}
							title={item.name}
							details={item.details}
						/>
					))}
				</section>
			</div>
		</ScrollArea>
	);
}
