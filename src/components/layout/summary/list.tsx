import { getSummaries } from "@/actions/summary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/firebase";
import { blurImage } from "@/lib/plaiceholder";
import { Suspense } from "react";
import LoadingCards from "../loading/cards";
import { SummaryCard } from "./summarycard";

export const SummaryGallery = async () => {
	const user = await getCurrentUser();
	const summaries = await getSummaries(user.id);
	const blurs = await Promise.all(
		summaries.map((item) => blurImage(item.imageUrl))
	);
	return (
		<ScrollArea>
			<Suspense fallback={<LoadingCards />}>
				<section className="py-8 pb-32 px-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-16">
					{summaries.map((item, index) => (
						<SummaryCard
							key={item.id}
							id={item.id}
							title={item.title}
							image={item.imageUrl}
							blur={blurs[index]!}
							imageId={item.image}
							updated={item.updated}
						/>
					))}
				</section>
			</Suspense>
		</ScrollArea>
	);
};
