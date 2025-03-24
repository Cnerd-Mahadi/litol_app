import LoadingBoxes from "@/components/layout/loading/boxes";
import { CreateNote } from "@/components/layout/note/create";
import { NoteGallery } from "@/components/layout/note/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function NotePage() {
	return (
		<main className="py-8 h-screen">
			<Tabs defaultValue="create" className="pl-4 h-full">
				<TabsList className="flex bg-white mx-auto p-0 border border-blue-500 w-full max-w-sm text-blue-600">
					<TabsTrigger
						value="create"
						className="bg-transparent data-[state=active]:bg-blue-500 data-[state=active]:shadow-none py-3 rounded-r-none w-full data-[state=active]:text-white">
						Create
					</TabsTrigger>
					<TabsTrigger
						value="gallery"
						className="bg-transparent data-[state=active]:bg-blue-500 data-[state=active]:shadow-none py-3 rounded-l-none w-full data-[state=active]:text-white">
						Gallery
					</TabsTrigger>
				</TabsList>
				<TabsContent value="create" className="py-4">
					<ScrollArea className="h-screen">
						<CreateNote />
					</ScrollArea>
				</TabsContent>
				<TabsContent value="gallery" className="py-4">
					<ScrollArea className="h-screen">
						<Suspense fallback={<LoadingBoxes boxHeight="h-32" />}>
							<NoteGallery />
						</Suspense>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</main>
	);
}
