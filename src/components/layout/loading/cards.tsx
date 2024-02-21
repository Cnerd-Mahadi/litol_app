import { Skeleton } from "@/components/ui/skeleton";
import { skeletonMin } from "@/utils";

export default function LoadingCards() {
	return (
		<main className="py-8 px-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
			{skeletonMin.map((item) => (
				<div key={item} className="space-y-4">
					<Skeleton className="rounded-lg w-full h-60" />
					<Skeleton className="h-4" />
				</div>
			))}
		</main>
	);
}
