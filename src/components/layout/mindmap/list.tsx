import { getMindMaps } from "@/actions/mindmap";
import { getCurrentUser } from "@/lib/firebase";
import { Suspense } from "react";
import LoadingBoxes from "../loading/boxes";
import { MindMapCard } from "./mindmap-card";

export const MindMapGallery = async () => {
	const user = await getCurrentUser();
	const mindmaps = await getMindMaps(user.id);
	console.log(mindmaps);
	return (
		<Suspense fallback={<LoadingBoxes boxHeight="h-40" />}>
			<section className="py-8 pb-32 px-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16">
				{mindmaps.map((item) => (
					<MindMapCard
						key={item.id}
						id={item.id}
						title={item.title}
						updated={item.updated}
					/>
				))}
			</section>
		</Suspense>
	);
};
