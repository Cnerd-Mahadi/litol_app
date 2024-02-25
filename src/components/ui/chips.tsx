"use client";

import { ChipsChangeEvent, Chips as PrimeChips } from "primereact/chips";

interface ChipsProps {
	id: "keywords";
	value: string[];
	onChange: (e: ChipsChangeEvent) => void;
}

export default function Chips({ id, value, onChange }: ChipsProps) {
	return (
		<PrimeChips
			placeholder="Add relevant keywords.."
			id={id}
			value={value}
			onChange={onChange}
			separator=","
			pt={{
				root: { className: "flex" },
				input: {
					className: "text-sm font-medium",
				},
				container: { className: "flex-1 gap-2 py-1" },
				token: {
					className: "bg-blue-500 text-white  text-xs py-1 px-2",
				},
			}}
		/>
	);
}
