import { getMindMaps } from "@/actions/mindmap";
import { getCurrentUser } from "@/lib/firebase";
import { MindMapCard } from "./mindmap-card";

export const MindMapGallery = async () => {
	const user = await getCurrentUser();
	const mindmaps = await getMindMaps(user.id);
	console.log(mindmaps);
	return (
		<section className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-8 pb-32">
			{mindmaps.map((item) => (
				<MindMapCard
					key={item.id}
					id={item.id}
					title={item.title}
					updated={item.updated}
				/>
			))}
		</section>
	);
};
