"use client";

import { useState } from "react";
import { Button } from "../../ui/button";

export const SummaryDetails = ({ details }: { details: string }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col gap-4">
			<Button
				className="bg-slate-800 hover:bg-slate-700 self-end mb-10"
				onClick={() => setOpen(!open)}>
				{open ? "Hide Details" : "Show Details"}
			</Button>
			<div
				className={`border-[3px] border-slate-300 font-medium p-6 rounded-md text-sm ${
					open ? "text-slate-500" : "text-slate-300"
				} min-h-16 transition-all duration-500 ease-in-out`}>
				{open ? details : "Details are hidden. Click Show Details to reveal!"}
			</div>
		</div>
	);
};
