import { useCallback, useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

export const Node = ({ data, isConnectable, id, selected }) => {
	const reactFlow = useReactFlow();
	const [nodeName, setNodeName] = useState(data.label);

	useEffect(() => {
		reactFlow.setNodes((nds) =>
			nds.map((node) => {
				if (node.id === id) {
					node.data = {
						...node.data,
						label: nodeName,
					};
				}

				return node;
			})
		);
	}, [reactFlow, id, nodeName]);

	const onChange = useCallback((evt) => {
		setNodeName(evt.target.value);
	}, []);

	return (
		<div className={`${selected && "node_selected"} text_updater_node`}>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
			/>
			<div className="text-input">
				<input
					id="text"
					name="text"
					value={data.label}
					onChange={onChange}
					className="nodrag"
				/>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
			/>
		</div>
	);
};
