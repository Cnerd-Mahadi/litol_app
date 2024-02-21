import feymanImage from "@/../public/assets/feynman.png";
import { getFeynmen } from "@/actions/feynman";
import { FeynmanCard } from "@/components/layout/feynman/feynman-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";

export default async function FeynmanPage() {
	const feynmen = await getFeynmen();
	return (
		<div className="w-full pl-3 py-8 mx-auto h-screen">
			<div className="hidden md:flex flex-row items-start gap-8 max-w-[38rem] mx-auto pb-12">
				<Image src={feymanImage} alt="feynman-pic" className="w-32" />
				<div className="space-y-2 pt-2 max-w-sm">
					<h2 className="text-slate-600 font-bold text-xl">Feynman Gallery</h2>
					<p className="text-slate-400 text-sm font-medium leading-7 tracking-tight">
						This section is for all the feynman session requested by users. To
						teach is to learn twice. Happy Learning!
					</p>
				</div>
			</div>
			<h3 className="block md:hidden max-w-xl mx-auto text-slate-700 font-semibold text-xl mb-2">
				Feynman Gallery
			</h3>
			<Suspense fallback={<Loading />}>
				<ScrollArea className="h-full">
					<div className="my-8 max-w-xl mx-auto space-y-6 pb-24">
						{feynmen.map((item) => (
							<FeynmanCard key={item.id} item={item} />
						))}
					</div>
				</ScrollArea>
			</Suspense>
		</div>
	);
}
