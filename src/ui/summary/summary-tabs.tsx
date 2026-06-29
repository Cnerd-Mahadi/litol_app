"use client"

import { Icons } from "@/components/ui/icons"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SummaryGallery } from "./summary-gallery"
import { SummaryCreate } from "./summary-create"

export function SummaryTabs() {
  return (
    <Tabs defaultValue="create" className="animate-fade-up">
      <TabsList>
        <TabsTrigger value="create"><Icons.sparkles size={13} />Generate</TabsTrigger>
        <TabsTrigger value="gallery"><Icons.doc size={13} />Gallery</TabsTrigger>
      </TabsList>
      <TabsContent value="create" className="mt-5">
        <SummaryCreate />
      </TabsContent>
      <TabsContent value="gallery" className="mt-5">
        <SummaryGallery />
      </TabsContent>
    </Tabs>
  )
}
