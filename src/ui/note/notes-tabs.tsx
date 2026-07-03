"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus } from "lucide-react";
import { NoteCreate } from "./note-create";
import { NotesGallery } from "./notes-gallery";

export function NotesTabs() {
	return (
		<Tabs defaultValue="create" className="animate-fade-up">
			<TabsList>
				<TabsTrigger value="create">
					<Plus size={14} strokeWidth={1.5} aria-hidden />
					Create
				</TabsTrigger>
				<TabsTrigger value="gallery">
					<FileText size={14} strokeWidth={1.5} aria-hidden />
					Gallery
				</TabsTrigger>
			</TabsList>
			<TabsContent value="create" className="mt-5">
				<NoteCreate />
			</TabsContent>
			<TabsContent value="gallery" className="mt-5">
				<NotesGallery />
			</TabsContent>
		</Tabs>
	);
}
