import { getMindMap } from "@/actions/mindmap";
import MindMapBoard from "@/components/layout/mindmap/mindmap-board";
import { MindmapUpdateForm } from "@/components/layout/mindmap/mindmap-update-form";
import { MindmapUpdateMobile } from "@/components/layout/mindmap/mindmap-update-mobile";
import { MindMapParams } from "@/types";

export const dynamic = "force-dynamic";

export default async function MindMapPage({ params }: MindMapParams) {
	const mindmap = await getMindMap(params.mindmapId);
	console.log(mindmap.nodes.length, "???MMM");
	return (
		<MindMapBoard
			nodesInit={mindmap.nodes}
			edgesInit={mindmap.edges}
			Form={<MindmapUpdateForm title={mindmap.title} id={mindmap.id} />}
			FormMobile={<MindmapUpdateMobile title={mindmap.title} id={mindmap.id} />}
		/>
	);
}
