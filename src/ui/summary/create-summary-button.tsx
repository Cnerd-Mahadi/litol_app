"use client";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsDemo } from "@/hooks/use-is-demo";
import { cn } from "@/lib/utils";
import { AddIcon } from "@/ui/shared/icons";
import Link from "next/link";

export function CreateSummaryButton() {
	const isDemo = useIsDemo();

	if (isDemo) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<span tabIndex={0}>
						<button
							disabled
							className={cn(buttonVariants(), "shrink-0 pointer-events-none opacity-50")}>
							<AddIcon size={16} strokeWidth={2} />
							Create
						</button>
					</span>
				</TooltipTrigger>
				<TooltipContent>Not available in demo mode</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Link href="/summary/new" className={cn(buttonVariants(), "shrink-0")}>
			<AddIcon size={16} strokeWidth={2} />
			Create
		</Link>
	);
}
