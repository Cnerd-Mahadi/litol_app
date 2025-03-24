import { getSummaries } from "@/actions/summary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/firebase";
import { SummaryCard } from "./summarycard";

export const SummaryGallery = async () => {
	const user = await getCurrentUser();
	const summaries = await getSummaries(user.id);
	return (
		<ScrollArea>
			<section className="gap-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6 py-8 pb-32">
				{summaries.map((item, index) => (
					<SummaryCard
						key={item.id}
						id={item.id}
						title={item.title}
						image={item.imageUrl}
						imageId={item.image}
						updated={item.updated}
					/>
				))}
			</section>
		</ScrollArea>
	);
};
