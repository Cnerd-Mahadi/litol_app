import { Skeleton } from "@/components/ui/skeleton";
import { skeletonMin } from "@/utils";

export default function Loading() {
	return (
		<main className="flex flex-row justify-between h-screen">
			<div className="h-full w-full px-2 md:px-6">
				<div className="pt-8 pb-20 w-full max-w-xl mx-auto">
					<Skeleton className="w-full md:h-96 h-60 object-cover mx-auto rounded-md" />
					<div className="flex flex-row gap-5 my-4 mb-10">
						<Skeleton className="w-20 h-16" />
						<div className="space-y-3">
							<Skeleton className="w-40 h-5" />
							<Skeleton className="w-32 h-5" />
						</div>
					</div>
					<div className="flex flex-row gap-6 pl-2 mb-8 flex-wrap">
						{skeletonMin.map((item) => (
							<Skeleton
								key={item}
								className="h-5 w-16 bg-slate-800 rounded-full"
							/>
						))}
					</div>
					<div className="w-full pl-2">
						<div className="flex flex-col gap-4">
							<Skeleton className="bg-slate-800 hover:bg-slate-700 h-8 w-28 self-end" />
							<Skeleton className="h-50 w-full border-slate-400 p-8 rounded-md text-base" />
						</div>
					</div>
				</div>
			</div>
			<div className="h-full w-full hidden md:block pr-4 py-8 max-w-72">
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
