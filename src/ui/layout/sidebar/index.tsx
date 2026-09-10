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
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { LogoutButton } from "./logout-button";
import { NavItem } from "./nav-item";

const STORAGE_KEY = "litol.sidebar";

const railButton =
	"flex h-8 w-full items-center rounded-md px-2.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const railLabel = (expanded: boolean) =>
	cn(
		"overflow-hidden whitespace-nowrap text-left text-ui transition-all duration-200",
		expanded ? "ml-2.5 flex-1 opacity-100" : "ml-0 w-0 opacity-0",
	);

function ThemeToggle({ expanded }: { expanded: boolean }) {
	const { activeTheme, setTheme } = useActiveTheme();
	const current = themeOptions.find((o) => o.value === activeTheme) ?? themeOptions[2];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button aria-label="Change theme" className={railButton}>
					<span className="grid w-5 shrink-0 place-items-center">
						<current.Icon size={16} strokeWidth={1.5} aria-hidden />
					</span>
					<span className={cn(railLabel(expanded), "flex items-center")}>
						Theme
						<span className="ml-auto text-caption text-foreground-faint">{current.label}</span>
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
	const [expanded, setExpanded] = useState(true);

	useEffect(() => {
		if (localStorage.getItem(STORAGE_KEY) === "collapsed") setExpanded(false);
	}, []);

	useEffect(() => {
		const state = expanded ? "expanded" : "collapsed";
		document.documentElement.dataset.sidebar = state;
		localStorage.setItem(STORAGE_KEY, state);
	}, [expanded]);

	return (
		<aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-(--sidebar-w) flex-col border-r border-border bg-sidebar transition-[width] duration-300 ease-[cubic-bezier(.2,0,0,1)] lg:flex">
			<div className="flex h-14 shrink-0 items-center px-3.5">
				<Logo expanded={expanded} />
			</div>

			<nav className="flex flex-1 flex-col gap-0.5 overflow-hidden px-2 pt-1">
				{navItems.map(({ name, route, Icon }) => (
					<NavItem key={name} route={route} title={name} Icon={Icon} expanded={expanded} />
				))}
			</nav>

			<div className="flex flex-col gap-0.5 px-2 pb-2">
				<ThemeToggle expanded={expanded} />
				<button
					onClick={() => setExpanded((e) => !e)}
					aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
					aria-pressed={expanded}
					className={railButton}>
					<span className="grid w-5 shrink-0 place-items-center">
						<CollapseIcon
							size={16}
							strokeWidth={1.5}
							aria-hidden
							className={cn("transition-transform duration-300", !expanded && "rotate-180")}
						/>
					</span>
					<span className={railLabel(expanded)}>Collapse</span>
				</button>
				<div className="my-1 h-px bg-border" />
				<LogoutButton expanded={expanded} />
			</div>
		</aside>
	);
};
