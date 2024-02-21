import { Skeleton } from "@/components/ui/skeleton";
import { skeletonMin } from "@/utils";

export default function Loading() {
	return (
		<main className="flex flex-row justify-between h-screen">
			<div className="h-full w-full px-2 md:px-6">
				<div className="pt-8 pb-20 w-full max-w-2xl mx-auto">
					<Skeleton className="w-full md:h-96 h-60 object-cover mx-auto rounded-md" />
					<div className="flex md:flex-row flex-wrap gap-6 gap-y-3 max-w-3xl w-full px-4 pt-6 md:pb-8 pb-2">
						<div className="flex flex-row gap-3 md:justify-center justify-start items-center">
							<Skeleton className="w-7 rounded-full h-7" />
							<Skeleton className="h-5 w-36" />
						</div>
						<div className="sm:flex hidden flex-row gap-3 items-center justify-center">
							<Skeleton className="w-7 rounded-lg h-7" />
							<Skeleton className="h-5 w-32" />
						</div>
					</div>
					<div className="max-w-[40rem] px-4">
						<Skeleton className="h-32" />
					</div>
				</div>
			</div>
			<div className="h-full w-full hidden md:block px-3 py-8 max-w-72">
				<h4 className="text-center text-slate-500 font-semibold pb-6">
					See Recent Contents
				</h4>
				{skeletonMin.map((item) => (
					<div
						key={item}
						className="flex flex-row gap-4 items-start mb-6 group">
						<Skeleton className="rounded-lg w-24 min-w-24 h-16 min-h-16" />
						<div className="space-y-2 w-full">
							<Skeleton className="h-3" />
							<Skeleton className="h-3" />
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
