"use client";

import { Button } from "@/components/ui/button";
import { feynmanSchema } from "@/types";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { BiCaretDownCircle } from "react-icons/bi";
import * as z from "zod";
import { FeynmanForm } from "./feynman-form";

export const FeynmanDialog = ({
	item,
}: {
	item: z.infer<typeof feynmanSchema>;
}) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className="py-2">
			<Button variant="outline" onClick={() => setVisible(true)}>
				Resolve
			</Button>
			<Dialog
				resizable={false}
				draggable={false}
				visible={visible}
				pt={{
					root: {
						className: "w-[95%] max-w-md",
					},
				}}
				onHide={() => setVisible(false)}>
				<div className="md:px-6">
					<div className="flex flex-col items-center mb-8">
						<BiCaretDownCircle className="size-16 text-blue-500 mb-4" />
						<h3 className="text-slate-700 text-xl font-semibold">
							Feynman Invitation
						</h3>
					</div>
					<FeynmanForm item={item} setVisible={setVisible} />
				</div>
			</Dialog>
		</div>
	);
};
