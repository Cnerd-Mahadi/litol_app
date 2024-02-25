import MindMapBoard from "@/components/layout/mindmap/mindmap-board";
import { MindmapCreateForm } from "@/components/layout/mindmap/mindmap-create-form";
import { MindmapCreateMobile } from "@/components/layout/mindmap/mindmap-create-mobile";

export default function CreateMindMapPage() {
	return (
		<MindMapBoard
			nodesInit={[]}
			edgesInit={[]}
			Form={<MindmapCreateForm />}
			FormMobile={<MindmapCreateMobile />}
		/>
	);
}
