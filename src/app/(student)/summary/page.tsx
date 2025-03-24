import LoadingCards from "@/components/layout/loading/cards";
import { CreateSummary } from "@/components/layout/summary/create";
import { SummaryGallery } from "@/components/layout/summary/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function SummaryPage() {
	return (
		<main className="py-8 h-screen">
			<Tabs defaultValue="create" className="pl-4 h-full">
				<TabsList className="flex bg-white mx-auto p-0 border border-blue-500 w-full max-w-sm text-blue-600">
					<TabsTrigger
						value="create"
						className="bg-transparent data-[state=active]:bg-blue-500 data-[state=active]:shadow-none rounded-r-none w-full data-[state=active]:text-white">
						Create
					</TabsTrigger>
					<TabsTrigger
						value="gallery"
						className="bg-transparent data-[state=active]:bg-blue-500 data-[state=active]:shadow-none rounded-l-none w-full data-[state=active]:text-white">
						Gallery
					</TabsTrigger>
				</TabsList>
				<TabsContent value="create" className="py-4">
					<ScrollArea className="h-screen">
						<CreateSummary />
					</ScrollArea>
				</TabsContent>
				<TabsContent value="gallery" className="py-4">
					<ScrollArea className="h-screen">
						<Suspense fallback={<LoadingCards />}>
							<SummaryGallery />
						</Suspense>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</main>
	);
}
