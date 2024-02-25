"use client";

import { feynmanSchema } from "@/types";
import Image from "next/image";
import * as z from "zod";
import { FeynmanDialog } from "./feynman-dialog";
import { FeynmanHover } from "./feynman-hover";
import { FeynmanMobileHover } from "./feynman-mobile-hover";

export const FeynmanCard = ({
	item,
}: {
	item: z.infer<typeof feynmanSchema>;
}) => {
	return (
		<div className="border border-blue-200 rounded-xl flex flex-row justify-between items-start px-3 md:px-8 py-4 md:py-6">
			<div className="flex flex-row items-start gap-5">
				<Image
					src={item.content.imageUrl}
					width={520}
					height={520}
					alt="content-pic"
					className="size-12 rounded-full mt-1 object-cover"
				/>
				<div>
					<h3 className="text-slate-800 text-sm font-semibold pb-1">
						{item.content.title}
					</h3>
					<p className="text-slate-400 text-xs font-medium pb-3">
						{item.subject}
					</p>
					<div className="hidden md:block">
						<FeynmanHover requested={item.requested} />
					</div>
					<div className="block md:hidden">
						<FeynmanMobileHover requested={item.requested} />
					</div>
				</div>
			</div>
			<FeynmanDialog item={item} />
		</div>
	);
};
