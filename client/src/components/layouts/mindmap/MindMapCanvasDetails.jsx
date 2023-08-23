import { useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import "./MindMap.css";
import { MindMapBoard } from "./MindMapBoard";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "src/hooks/useAxios";
import { useCustomValidation } from "src/hooks/useCustomValidation";
import { useMutateQuery } from "src/hooks/useMutateQuery";
import { useSnack } from "src/hooks/useSnack";
import { localUserData } from "src/utils";
import { mindmapTitleUpdatedSchema } from "src/validations";
import { Loading } from "../Loading";

export const MindMapCanvasDetails = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodeId, setNodeId] = useState(1);

	const { mindmapId } = useParams();
	const navigate = useNavigate();
	const { snack, setSnack } = useSnack();
	const axios = useAxios();

	const { handleSubmit, control, setValue, ...methods } = useForm({
		defaultValues: {
			title: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(mindmapTitleUpdatedSchema),
	});

	useCustomValidation("title", "student/titleUpdateCheck", methods, "Title", {
		title: methods.watch("title"),
		id: mindmapId,
		collection: "mindmaps",
		user_id: localUserData().userInfo.id,
	});

	const { isLoading: isDataLoading } = useQuery(
		["student/mindmapContent"],
		() => axios.get(`student/mindmap/${mindmapId}`),
		{
			cacheTime: 0,
			onSuccess: (response) => {
				const mindmap = response.data.mindmap;
				const nodes = JSON.parse(mindmap.data.nodes);
				const edges = JSON.parse(mindmap.data.edges);
				const nodeId = parseInt(nodes[nodes.length - 1].id);
				setEdges(edges);
				setNodes(nodes);
				setValue("title", mindmap.data.title);
				setNodeId(nodeId + 1);
			},
		}
	);

	const { isLoading, mutate } = useMutateQuery(
		"student/updateMindMap",
		"student/updateMindMap"
	);

	const onSubmit = (data) => {
		const resultData = {
			title: data.title,
			nodes: JSON.stringify(nodes),
			edges: JSON.stringify(edges),
			user_id: localUserData().userInfo.id,
			mindmap_id: mindmapId,
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

	if (isDataLoading) return <Loading />;

	return (
		<MindMapBoard
			onSubmit={onSubmit}
			handleSubmit={handleSubmit}
			isLoading={isLoading}
			snack={snack}
			setSnack={setSnack}
			control={control}
			buttonText="Update"
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
