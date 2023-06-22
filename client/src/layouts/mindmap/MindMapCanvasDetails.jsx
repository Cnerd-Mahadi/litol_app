import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	addEdge,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import "./MindMap.css";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { apiPostDataHandler } from "../../services/apiManager";
import {
	baseURL,
	getHeader,
	getLocalData,
	headerType,
} from "../../utilities/utility";
import { Loading } from "./../../pages/Loading";
import { Node } from "./Node";

const fitViewOptions = {
	padding: 3,
};

const localUserData = getLocalData("userData");

export const MindMapCanvasDetails = () => {
	const reactFlowWrapper = useRef(null);
	const connectingNodeId = useRef(null);
	const { mindmapId } = useParams();

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodeId, setNodeId] = useState(null);
	const [title, setTitle] = useState("");

	const { isLoading } = useQuery(["student/mindmapContent"], () =>
		axios
			.get(baseURL + `student/mindmap/${mindmapId}`, {
				headers: getHeader(headerType.tokenize, localUserData.token),
			})
			.then((res) => {
				const data = res.data.data.mindmap;
				const nodes = JSON.parse(data.nodes);
				const edges = JSON.parse(data.edges);
				const nodeId = nodes[nodes.length - 1].id;
				setEdges(edges);
				setNodes(nodes);
				setTitle(data.title);
				setNodeId(nodeId + 1);
			})
	);

	const { project } = useReactFlow();
	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);
	const navigate = useNavigate();

	const handleSave = () => {
		console.log(title, nodes, edges);
		const resultData = {
			title: title,
			nodes: JSON.stringify(nodes),
			edges: JSON.stringify(edges),
			user_id: localUserData.userInfo.details.user_id,
			mindmap_id: mindmapId,
		};

		if (nodes.length > 0) {
			apiPostDataHandler(
				"student/updateMindMap",
				resultData,
				getHeader(headerType.tokenize, localUserData.token)
			);
			navigate("/student/mindmap");
		} else {
			console.log("Nodes empty");
		}
	};

	const handleClick = () => {
		nodes.length === 0 && setNodeId(1);
		console.log(nodes.length, nodeId);
		const id = nodes.length === 0 ? 1 : nodeId;
		const newNode = {
			id: `${id}`,
			type: "textUpdater",
			data: { label: `Node ${id}` },
			position: { x: 0, y: 0 },
		};
		setNodes((nds) => nds.concat(newNode));
		setNodeId((id) => id + 1);
	};

	const onConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd = useCallback(
		(event) => {
			const targetIsPane = event.target.classList.contains("react-flow__pane");

			if (targetIsPane) {
				// we need to remove the wrapper bounds, in order to get the correct position
				const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
				const id = `${nodeId}`;
				const newNode = {
					id,
					type: "textUpdater",
					position: project({
						x: event.clientX - left - 75,
						y: event.clientY - top,
					}),
					data: { label: `Node ${id}` },
				};

				setNodes((nds) => nds.concat(newNode));
				setNodeId((id) => id + 1);
				setEdges((eds) =>
					eds.concat({ id, source: connectingNodeId.current, target: id })
				);
			}
		},
		[project, setNodes, setEdges, nodeId]
	);

	if (isLoading) return <Loading />;

	return (
		<div
			style={{ width: "100vw", height: "100vh", position: "relative" }}
			className="wrapper"
			ref={reactFlowWrapper}>
			<TextField
				id="title"
				label="Title"
				variant="outlined"
				placeholder="Title.."
				sx={{
					position: "absolute",
					top: "2%",
					left: "2%",
					zIndex: 10,
					boxShadow: 1,
				}}
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				onConnectEnd={onConnectEnd}
				fitView
				fitViewOptions={fitViewOptions}
				nodeTypes={nodeTypes}>
				<Background color="#000" variant="dots" gap={16} />
				<MiniMap
					nodeColor={(n) => {
						if (n.type === "textUpdater") return "blue";

						return "#FFCC00";
					}}
				/>
				<Controls />
			</ReactFlow>
			<Button
				variant="contained"
				sx={{
					position: "absolute",
					bottom: "0%",
					left: "10%",
					transform: "translate(-50%, -50%)",
				}}
				onClick={handleClick}>
				ADD NODE
			</Button>

			<Button
				variant="contained"
				color="success"
				sx={{
					position: "absolute",
					bottom: "0%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
				onClick={handleSave}>
				Save
			</Button>
		</div>
	);
};
