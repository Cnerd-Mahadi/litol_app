"use client";

import { ChangeEvent, memo, useCallback } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

export const InputNode = memo(function InputNode({
	isConnectable,
	id,
	data,
}: NodeProps) {
	const { setNodes } = useReactFlow();
	const onChange = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			setNodes((nodes) =>
				nodes.map((node) =>
					node.id === id
						? {
								...node,
								data: { label: evt.currentTarget.value },
						  }
						: node
				)
			);
		},
		[id, setNodes]
	);

	return (
		<div className="px-2 py-2 border-2 bg-white border-purple-400 rounded-md">
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				className="!w-8 !h-4 !rounded-sm !-mt-2 !bg-purple-600"
			/>
			<input
				id="text"
				name="text"
				defaultValue={data.label}
				onChange={onChange}
				placeholder="New Node"
				className="nodrag font-medium text-slate-900 focus:outline-none focus:bg-slate-100 focus:rounded-sm text-center"
			/>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				className="!w-8 !h-4 !rounded-sm !-mb-2 !bg-purple-600"
			/>
		</div>
	);
});
