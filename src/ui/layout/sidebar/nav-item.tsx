"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
	route: string;
	title: string;
	Icon: LucideIcon;
	expanded: boolean;
}

export const NavItem = ({ route, title, Icon, expanded }: NavItemProps) => {
	const path = usePathname();
	const isActive =
		(path.startsWith(route) && route !== "/") ||
		(route === "/" && path === "/");

	return (
		<Link
			href={route}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				"group relative flex h-10 items-center overflow-hidden rounded-lg transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				expanded ? "px-3" : "justify-center",
				isActive
					? "bg-accent text-accent-foreground"
					: "text-muted-foreground hover:bg-secondary hover:text-foreground",
			)}>
			{isActive && (
				<span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
			)}
			<span className="grid w-5 shrink-0 place-items-center">
				<Icon size={19} strokeWidth={2} aria-hidden />
			</span>
			<span
				className={cn(
					"whitespace-nowrap text-[13.5px] font-medium transition-all duration-200",
					expanded ? "ml-3 opacity-100" : "ml-0 w-0 opacity-0",
				)}>
				{title}
			</span>
		</Link>
	);
};
