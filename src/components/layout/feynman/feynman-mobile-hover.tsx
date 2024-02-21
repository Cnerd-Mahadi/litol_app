"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { feynmanSchema } from "@/types";
import { formatedName } from "@/utils";
import Image from "next/image";
import * as z from "zod";

interface FeynmanHoverProps {
	requested: z.infer<typeof feynmanSchema.shape.requested>;
}

export const FeynmanMobileHover = ({ requested }: FeynmanHoverProps) => {
	return (
		<Sheet>
			<SheetTrigger>
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
			</SheetTrigger>
			<SheetContent className="w-full max-w-md">
				<SheetHeader>
					<SheetTitle className="font-bold text-slate-800 mb-5 text-left">
						Feynman Requests:
					</SheetTitle>
					<div className="space-y-6 w-full">
						{requested.map((item) => (
							<div
								key={item.id}
								className="flex flex-row items-start w-full gap-3">
								<div className="text-xs font-semibold text-slate-600 flex flex-row items-start gap-3 w-fit">
									<Image
										key={item.id}
										src={item.imageUrl}
										alt="user-pic"
										width={240}
										height={240}
										className="size-6 rounded-full"
									/>
									<p className="text-slate-700">{formatedName(item.name)}</p>
								</div>
								<p className="text-slate-400 text-xs font-medium min-w-32 break-words">
									{item.email}
								</p>
							</div>
						))}
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};
