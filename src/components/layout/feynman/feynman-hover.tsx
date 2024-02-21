"use client";

import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";
import { feynmanSchema } from "@/types";
import { formatedName } from "@/utils";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import Image from "next/image";
import * as z from "zod";

interface FeynmanHoverProps {
	requested: z.infer<typeof feynmanSchema.shape.requested>;
}

export const FeynmanHover = ({ requested }: FeynmanHoverProps) => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<div className="flex flex-row items-start ml-1">
					{requested.map((item) => (
						<Image
							key={item.id}
							src={item.imageUrl}
							alt="user-pic"
							width={240}
							height={240}
							className="size-6 rounded-full"
						/>
					))}
				</div>
			</HoverCardTrigger>
			<HoverCardContent className="w-fit">
				<div className="space-y-1">
					<h4 className="font-bold text-slate-800 mb-5">Feynman Requests:</h4>
					<div className="space-y-6">
						{requested.map((item) => (
							<div key={item.id} className="flex flex-row items-start gap-3">
								<div className="text-xs font-semibold text-slate-600 flex flex-row items-start gap-2">
									<Image
										key={item.id}
										src={item.imageUrl}
										alt="user-pic"
										width={240}
										height={240}
										className="size-6 rounded-full"
									/>
									<p className="text-slate-700 w-28">
										{formatedName(item.name)}
									</p>
								</div>
								<p className="text-slate-400 text-xs font-medium">
									{item.email}
								</p>
							</div>
						))}
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};
