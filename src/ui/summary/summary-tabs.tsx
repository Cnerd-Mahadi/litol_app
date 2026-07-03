"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Sparkles } from "lucide-react";
import { SummaryCreate } from "./summary-create";
import { SummaryGallery } from "./summary-gallery";

export function SummaryTabs() {
	return (
		<Tabs defaultValue="create" className="animate-fade-up">
			<TabsList>
				<TabsTrigger value="create">
					<Sparkles size={14} strokeWidth={1.5} aria-hidden />
					Generate
				</TabsTrigger>
				<TabsTrigger value="gallery">
					<FileText size={14} strokeWidth={1.5} aria-hidden />
					Gallery
				</TabsTrigger>
			</TabsList>
			<TabsContent value="create" className="mt-5">
				<SummaryCreate />
			</TabsContent>
			<TabsContent value="gallery" className="mt-5">
				<SummaryGallery />
			</TabsContent>
		</Tabs>
	);
}
