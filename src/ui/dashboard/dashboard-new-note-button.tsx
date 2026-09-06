"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsDemo } from "@/hooks/use-is-demo";
import { AddIcon } from "@/ui/shared/icons";
import Link from "next/link";

export function DashboardNewNoteButton() {
	const isDemo = useIsDemo();

	if (isDemo) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>
					<span tabIndex={0}>
						<button
							disabled
							className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13.5px] font-medium text-primary-foreground pointer-events-none opacity-50">
							<AddIcon size={16} strokeWidth={2} aria-hidden />
							New note
						</button>
					</span>
				</TooltipTrigger>
				<TooltipContent>Not available in demo mode</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<Link
			href="/note/new"
			className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13.5px] font-medium text-primary-foreground shadow-(--shadow-btn) transition-[filter] hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
			<AddIcon size={16} strokeWidth={2} aria-hidden />
			New note
		</Link>
	);
}
