import { useCallback, useMemo, useRef, useState } from "react";
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
import * as yup from "yup";
import "./MindMap.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SnackAlert } from "../../components/common/SnackAlert";
import { useStatus } from "../../hooks/useStatus";
import { apiPostDataHandler } from "../../services/apiManager";
import {
	checkUniqueness,
	getHeader,
	getLocalData,
	headerType,
} from "../../utilities/utility";
import { Node } from "./Node";

const fitViewOptions = {
	padding: 3,
};

const mindmapTitleSchema = yup.object().shape({
	title: yup
		.string()
		.required()
		.min(3)
		.max(20)
		.test("titleCheck", "Title is not available", async function (value) {
			if (value) {
				const isUnique = await checkUniqueness(
					"student/titleCheck",
					getHeader(headerType.tokenize, getLocalData("userData").token),
					{
						title: value,
						collection: "mindmaps",
						user_id: getLocalData("userData").userInfo.id,
					}
				);
				return isUnique;
			}
			return true;
		}),
});

const localUserData = getLocalData("userData");

export const MindMapCanvas = () => {
	const { handleSubmit, control } = useForm({
		values: {
			title: "",
		},
		mode: "onBlur",
		resolver: yupResolver(mindmapTitleSchema),
	});
	const reactFlowWrapper = useRef(null);
	const connectingNodeId = useRef(null);
	const {
		snack: { open, message, severity },
		setSnack,
		setLoading,
		loading,
	} = useStatus();

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [nodeId, setNodeId] = useState(1);

	const { project } = useReactFlow();
	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		const resultData = {
			title: data.title,
			nodes: JSON.stringify(nodes),
			edges: JSON.stringify(edges),
			user_id: localUserData.userInfo.id,
		};
		setLoading(true);
		console.log(resultData);

		if (nodes.length > 0) {
			apiPostDataHandler(
				"student/submitMindMap",
				resultData,
				getHeader(headerType.tokenize, localUserData.token)
			).then((res) => {
				setLoading(false);
				setSnack({
					open: true,
					severity: "success",
					message: "New mindmap created successfully!",
				});
				setTimeout(() => {
					navigate("/student/mindmap");
				}, 2100);
			});
		} else {
			setLoading(false);
			setSnack({
				open: true,
				message: "Nodes are empty",
				severity: "error",
			});
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

	return (
		<Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
			<div
				style={{ width: "100vw", height: "100vh", position: "relative" }}
				className="wrapper"
				ref={reactFlowWrapper}>
				<Controller
					name={"title"}
					control={control}
					render={({ field, fieldState }) => (
						<TextField
							label="Title"
							variant="outlined"
							sx={{
								position: "absolute",
								top: "2%",
								left: "2%",
								zIndex: 10,
								boxShadow: 1,
							}}
							onChange={field.onChange}
							onBlur={field.onBlur}
							value={field.value}
							error={fieldState.error ? true : false}
							helperText={fieldState.error?.message}
						/>
					)}
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
					type="submit"
					disabled={loading}
					variant="contained"
					color="primary"
					sx={{
						position: "absolute",
						bottom: "0%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}>
					Save
					{loading && (
						<CircularProgress size={"1rem"} sx={{ ml: 1 }} color="inherit" />
					)}
				</Button>
			</div>
			<SnackAlert
				open={open}
				severity={severity}
				message={message}
				handleSnack={setSnack}
			/>
		</Box>
	);
};
