"use client";

import { cn } from "@/lib/utils";
import { navItems, themeOptions } from "@/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActiveTheme } from "@/hooks/use-active-theme";
import { CheckIcon, CollapseIcon } from "@/ui/shared/icons";
import { useState } from "react";
import { Logo } from "./logo";
import { LogoutButton } from "./logout-button";
import { NavItem } from "./nav-item";

function ThemeToggle({ expanded }: { expanded: boolean }) {
	const { activeTheme, setTheme } = useActiveTheme();
	const current = themeOptions.find((o) => o.value === activeTheme) ?? themeOptions[2];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Change theme"
					className="flex h-9 w-full items-center rounded-md px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					<span className="shrink-0">
						<current.Icon size={16} strokeWidth={1.5} aria-hidden />
					</span>
					<span
						className={cn(
							"whitespace-nowrap overflow-hidden text-left text-[13.5px] transition-all duration-200",
							expanded ? "flex-1 ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
						)}>
						{current.label} mode
					</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="top">
				{themeOptions.map(({ value, label, Icon }) => (
					<DropdownMenuItem key={value} onClick={() => setTheme(value)}>
						<Icon size={15} strokeWidth={1.5} aria-hidden />
						<span className="flex-1">{label}</span>
						{activeTheme === value && <CheckIcon size={14} strokeWidth={2} aria-hidden />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export const SideBar = () => {
	const [expanded, setExpanded] = useState(false);

	return (
		<aside
			className="bg-card fixed bottom-0 left-0 top-0 z-40 hidden flex-col border-r border-border transition-[width] duration-300 ease-[cubic-bezier(.2,0,0,1)] lg:flex"
			style={{ width: expanded ? 220 : 64 }}>
			<div className="flex h-16 shrink-0 items-center px-3.5">
				<Logo expanded={expanded} />
			</div>

			<nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2.5 pt-2">
				<div
					className={cn(
						"mb-1 whitespace-nowrap px-2.5 text-[11px] uppercase tracking-[0.16em] text-foreground-faint transition-opacity",
						expanded ? "opacity-100" : "opacity-0",
					)}>
					Workspace
				</div>
				{navItems.map(({ name, route, Icon }) => (
					<NavItem
						key={name}
						route={route}
						title={name}
						Icon={Icon}
						expanded={expanded}
					/>
				))}
			</nav>

			<div className="flex flex-col gap-0.5 px-2.5 pb-2">
				<ThemeToggle expanded={expanded} />
				<button
					onClick={() => setExpanded((e) => !e)}
					aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
					aria-pressed={expanded}
					className="flex h-9 w-full items-center rounded-md px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					<CollapseIcon size={16} strokeWidth={1.5} aria-hidden />
					<span
						className={cn(
							"whitespace-nowrap overflow-hidden text-[13.5px] transition-all duration-200",
							expanded ? "ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
						)}>
						Collapse
					</span>
				</button>
				<div className="my-1 h-px bg-border" />
				<LogoutButton expanded={expanded} />
			</div>
		</aside>
	);
};
