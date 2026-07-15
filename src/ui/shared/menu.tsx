"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MOBILE_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type MenuItem = {
	label: string;
	icon: ReactNode;
	onClick: () => void;
	destructive?: boolean;
};

/** Floating dropdown on desktop/tablet, bottom-sheet action list on phones. */
export function Menu({
	trigger,
	items,
	align = "end",
}: {
	trigger: ReactNode;
	items: MenuItem[];
	align?: "start" | "end";
}) {
	const isMobile = useMediaQuery(MOBILE_QUERY);

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>{trigger}</DrawerTrigger>
				<DrawerContent>
					<div className="flex flex-col gap-1 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
						{items.map((item) => (
							<DrawerClose asChild key={item.label}>
								<button
									type="button"
									onClick={item.onClick}
									className={cn(
										"flex items-center gap-3 rounded-md px-3 py-3 text-left text-[14px] font-medium transition-colors active:bg-accent",
										item.destructive ? "text-destructive" : "text-foreground",
									)}>
									{item.icon}
									{item.label}
								</button>
							</DrawerClose>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent align={align}>
				{items.map((item) => (
					<DropdownMenuItem
						key={item.label}
						onClick={item.onClick}
						variant={item.destructive ? "destructive" : "default"}>
						{item.icon}
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
