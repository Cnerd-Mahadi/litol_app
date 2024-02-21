"use client";

import { newNodeId } from "@/actions/mindmap";
import { useReactFlow } from "reactflow";

export const useMindMap = () => {
	const { setNodes, setEdges } = useReactFlow();
	const handleAddNode = () => {
		const newNode = {
			id: newNodeId(),
			position: {
				x: 10,
				y: 10,
			},
			type: "textUpdater",
			data: { label: "" },
			origin: [0.5, 0.0],
		};
		setNodes((prevNodes) => prevNodes.concat(newNode));
	};
	const handleClearCanvas = () => {
		setNodes([]);
		setEdges([]);
	};
	return {
		handleAddNode,
		handleClearCanvas,
	};
};
