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
			title={expanded ? undefined : title}
			className={cn(
				"flex h-8 items-center overflow-hidden rounded-md px-2.5 transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				isActive
					? "bg-accent text-foreground"
					: "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
			)}>
			<span className="grid w-5 shrink-0 place-items-center">
				<Icon size={16} strokeWidth={1.75} aria-hidden />
			</span>
			<span
				className={cn(
					"whitespace-nowrap text-ui transition-all duration-200",
					isActive && "font-medium",
					expanded ? "ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
				)}>
				{title}
			</span>
		</Link>
	);
};
