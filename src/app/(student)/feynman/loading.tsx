import { Skeleton } from "@/components/ui/skeleton";
import { skeletonMin } from "@/utils";

export default function Loading() {
	return (
		<div className="pr-5 h-full">
			<div className="my-8 max-w-xl w-full mx-auto space-y-6 pb-24">
				{skeletonMin.map((item) => (
					<Skeleton
						key={item}
						className="h-32 rounded-xl flex flex-row justify-between items-start px-3 md:px-8 py-4 md:py-6">
						<div className="flex flex-row items-start gap-5">
							<Skeleton className="size-12 rounded-full" />
							<div>
								<Skeleton className="h-4 pb-1 w-32 mb-3" />
								<Skeleton className="h-3 pb-3 w-20" />
							</div>
						</div>
					</Skeleton>
				))}
			</div>
		</div>
	);
}
