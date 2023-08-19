import { useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import "./MindMap.css";
import { MindMapBoard } from "./MindMapBoard";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutateQuery } from "src/hooks/useMutateQuery";
import { useSnack } from "src/hooks/useSnack";
import { localUserData } from "src/utils";
import { mindmapTitleSchema } from "src/validations";

export const MindMapCanvas = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodeId, setNodeId] = useState(1);

	const navigate = useNavigate();
	const { snack, setSnack } = useSnack();

	const { isLoading, mutate } = useMutateQuery(
		"student/submitMindMap",
		"student/submitMindMap"
	);

	const { handleSubmit, control } = useForm({
		defaultValues: {
			title: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(mindmapTitleSchema),
	});

	const onSubmit = (data) => {
		const resultData = {
			title: data.title,
			nodes: JSON.stringify(nodes),
			edges: JSON.stringify(edges),
			user_id: localUserData.userInfo.id,
		};
		if (nodes.length > 0) {
			mutate(resultData, {
				onSuccess: (response) => {
					console.log(response);
					setSnack((prev) => ({
						...prev,
						open: true,
						status: "success",
						title: "Success",
						message: response.data,
					}));
					setTimeout(() => navigate("/student/mindmap"), 1900);
				},
				onError: (error) => {
					console.log(error);
					setSnack((prev) => ({
						...prev,
						open: true,
						status: "error",
						title: "Error",
						message: "Something went wrong! Please try again.",
					}));
				},
			});
		} else {
			setSnack((prev) => ({
				...prev,
				open: true,
				status: "error",
				title: "Error",
				message: "Nodes are empty!",
			}));
		}
	};
	return (
		<MindMapBoard
			onSubmit={onSubmit}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			snack={snack}
			setSnack={setSnack}
			control={control}
			buttonText="Save"
			nodes={nodes}
			setNodes={setNodes}
			edges={edges}
			setEdges={setEdges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			nodeId={nodeId}
			setNodeId={setNodeId}
		/>
	);
};
