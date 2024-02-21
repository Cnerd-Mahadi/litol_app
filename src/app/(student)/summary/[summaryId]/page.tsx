import { getSummaries, getSummary } from "@/actions/summary";
import { Summary } from "@/components/layout/summary";
import { SummaryCardSidebar } from "@/components/layout/summary/summary-card-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export default async function SummaryContentPage({
	params,
}: {
	params: { summaryId: string };
}) {
	const user = await getCurrentUser();
	const summaries = await getSummaries(user.id);
	const summary = await getSummary(params.summaryId);

	return (
		<main className="flex flex-row justify-between h-screen">
			<ScrollArea className="h-full w-full px-2 md:px-6">
				<Summary
					title={summary.title}
					updated={summary.updated}
					image={summary.imageUrl}
					details={summary.details}
					keywords={summary.keywords}
				/>
			</ScrollArea>
			<ScrollArea className="h-full w-full hidden md:block px-3 py-8 max-w-72">
				<h4 className="text-center text-slate-500 font-semibold pb-6">
					See Recent Contents
				</h4>
				{summaries.map((item) => (
					<SummaryCardSidebar
						key={item.id}
						id={item.id}
						title={item.title}
						image={item.imageUrl}
						updated={item.updated}
					/>
				))}
			</ScrollArea>
		</main>
	);
}
