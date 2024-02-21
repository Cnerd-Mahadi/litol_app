"use client";

import { ReactElement, useCallback, useRef, useState } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	Edge,
	MiniMap,
	Node,
	OnConnect,
	OnConnectEnd,
	OnConnectStart,
	addEdge,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "reactflow";

import { newNodeId } from "@/actions/mindmap";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import "reactflow/dist/style.css";
import { MindmapBar } from "./mindmap-bar";
import { MindMapSidebar } from "./mindmap-sidebar";
import { MobileAlert } from "./mobile-alert";
import { InputNode } from "./node";

const nodeTypes = { textUpdater: InputNode };

interface MindMapBoardProps {
	nodesInit: Node[];
	edgesInit: Edge[];
	Form: ReactElement;
	FormMobile: ReactElement;
}

export default function MindMapBoard({
	nodesInit,
	edgesInit,
	Form,
	FormMobile,
}: MindMapBoardProps) {
	const router = useRouter();
	const [alert, setAlert] = useState(true);
	const flowRef = useRef<null | HTMLDivElement>(null);
	const connectingNodeId = useRef<null | string>(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(nodesInit);
	const [edges, setEdges, onEdgesChange] = useEdgesState(edgesInit);
	const { screenToFlowPosition } = useReactFlow();
	const onConnect: OnConnect = useCallback(
		(params) => {
			connectingNodeId.current = null;
			setEdges((eds) => addEdge(params, eds));
		},
		[setEdges]
	);

	const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd: OnConnectEnd = useCallback(
		(event) => {
			const targetIsPane = (event.target as HTMLElement).classList.contains(
				"react-flow__pane"
			);
			if (targetIsPane) {
				console.log(event);
				const nodeId = newNodeId();
				const newNode = {
					id: nodeId,
					position: screenToFlowPosition({
						x:
							event instanceof MouseEvent
								? event.clientX
								: event.touches[0].clientX,
						y:
							event instanceof MouseEvent
								? event.clientY
								: event.touches[0].clientY,
					}),
					type: "textUpdater",
					data: { label: "" },
					origin: [0.5, 0.0],
				};

				setNodes((nds) => nds.concat(newNode));
				setEdges((eds) => {
					if (connectingNodeId.current) {
						const newEdge = {
							id: `edge_${connectingNodeId.current}to${nodeId}`,
							source: connectingNodeId.current,
							target: nodeId,
						};
						return eds.concat(newEdge);
					}
					return eds;
				});
			}
		},
		[screenToFlowPosition, setNodes, setEdges]
	);

	return (
		<div className="w-screen h-screen">
			<ReactFlow
				ref={flowRef}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				onConnectEnd={onConnectEnd}
				fitView
				fitViewOptions={{ padding: 1 }}
				nodeOrigin={[0.5, 0]}
				nodeTypes={nodeTypes}>
				<Background variant={BackgroundVariant.Dots} color="#3b82f6" />
				<MiniMap
					position="bottom-left"
					nodeColor={"#6366f1"}
					className="block"
				/>
			</ReactFlow>
			<Form.type {...Form.props} />
			<Button
				onClick={() => router.back()}
				variant="outline"
				size="icon"
				className="px-2 md:hidden absolute top-4 left-4">
				<ArrowRightIcon className="size-10" />
			</Button>
			<MindMapSidebar>
				<FormMobile.type {...FormMobile.props} />
			</MindMapSidebar>
			<MindmapBar />
			<MobileAlert open={alert} setOpen={setAlert} />
		</div>
	);
}
