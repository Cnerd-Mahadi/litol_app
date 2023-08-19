import { AddCircle } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { useCallback, useMemo, useRef } from "react";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	addEdge,
	useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import "./MindMap.css";

import { PropTypes } from "prop-types";
import { InputField } from "src/components/ui/InputField";
import SnackAlert from "src/components/ui/SnackAlert";
import { Node } from "./Node";

const form = {
	position: "absolute",
	top: "4%",
	left: "2%",
	zIndex: 10,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: 4,
};

export const MindMapBoard = ({ ...props }) => {
	const {
		isLoading,
		handleSubmit,
		control,
		onSubmit,
		buttonText,
		snack,
		setSnack,
		nodes,
		setNodes,
		onNodesChange,
		edges,
		setEdges,
		onEdgesChange,
		nodeId,
		setNodeId,
	} = props;

	const reactFlowWrapper = useRef(null);
	const connectingNodeId = useRef(null);

	const { project } = useReactFlow();

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	const nodeTypes = useMemo(() => ({ textUpdater: Node }), []);

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
		console.log(nodes);
	};

	const onConnectStart = useCallback((_, { nodeId }) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd = useCallback(
		(event) => {
			const targetIsPane = event.target.classList.contains("react-flow__pane");

			if (targetIsPane) {
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
		[project, setNodes, setEdges, nodeId, setNodeId]
	);

	return (
		<div
			style={{ width: "100%", height: "100vh", position: "relative" }}
			className="wrapper"
			ref={reactFlowWrapper}>
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={form}>
				<InputField id={"title"} control={control} label="Title" />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}>
					{buttonText}
					{isLoading && (
						<CircularProgress size={"1rem"} sx={{ ml: 1 }} color="inherit" />
					)}
				</Button>
			</Box>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onConnectStart={onConnectStart}
				onConnectEnd={onConnectEnd}
				fitView
				fitViewOptions={{ padding: 3 }}
				nodeTypes={nodeTypes}>
				<Background color="#000" variant="dots" gap={16} />
				<MiniMap
					position="top-right"
					nodeColor={(n) => {
						if (n.type === "textUpdater") return "blue";
						return "#FFCC00";
					}}
				/>
				<Controls />
			</ReactFlow>
			<IconButton
				variant="contained"
				disabled={isLoading}
				sx={{
					position: "absolute",
					bottom: "15%",
					right: "5%",
				}}
				onClick={handleClick}>
				<AddCircle color="primary" sx={{ fontSize: 40 }} />
			</IconButton>
			<SnackAlert
				open={snack.open}
				status={snack.status}
				message={snack.message}
				title={snack.title}
				exit={snack.exit}
				setSnack={setSnack}
			/>
		</div>
	);
};

MindMapBoard.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	control: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired,
	snack: PropTypes.object.isRequired,
	setSnack: PropTypes.func.isRequired,
	nodes: PropTypes.array.isRequired,
	setNodes: PropTypes.func.isRequired,
	onNodesChange: PropTypes.func.isRequired,
	edges: PropTypes.array.isRequired,
	setEdges: PropTypes.func.isRequired,
	onEdgesChange: PropTypes.func.isRequired,
	nodeId: PropTypes.number.isRequired,
	setNodeId: PropTypes.func.isRequired,
};
