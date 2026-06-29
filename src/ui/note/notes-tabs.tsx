"use client"

import { Icons } from "@/components/ui/icons"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NotesGallery } from "./notes-gallery"
import { NoteCreate } from "./note-create"

export function NotesTabs() {
  return (
    <Tabs defaultValue="create" className="animate-fade-up">
      <TabsList>
        <TabsTrigger value="create"><Icons.plus size={13} />Create</TabsTrigger>
        <TabsTrigger value="gallery"><Icons.doc size={13} />Gallery</TabsTrigger>
      </TabsList>
      <TabsContent value="create" className="mt-5">
        <NoteCreate />
      </TabsContent>
      <TabsContent value="gallery" className="mt-5">
        <NotesGallery />
      </TabsContent>
    </Tabs>
  )
}
