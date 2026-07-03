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
import { Check, PanelLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { LogoutButton } from "./logout-button";
import { NavItem } from "./nav-item";

function ThemeToggle({
	expanded,
	onOpenChange,
}: {
	expanded: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const { activeTheme, setTheme } = useActiveTheme();
	const current = themeOptions.find((o) => o.value === activeTheme) ?? themeOptions[2];

	return (
		<DropdownMenu onOpenChange={onOpenChange}>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Change theme"
					className={cn(
						"flex h-9 w-full items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						expanded ? "px-3" : "justify-center",
					)}>
					<span className="shrink-0">
						<current.Icon size={16} strokeWidth={1.5} aria-hidden />
					</span>
					<span
						className={cn(
							"whitespace-nowrap text-left text-[13.5px] transition-opacity",
							expanded ? "flex-1 ml-2.5 opacity-100" : "ml-0 w-0 overflow-hidden opacity-0",
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
						{activeTheme === value && <Check size={14} strokeWidth={2} aria-hidden />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export const SideBar = () => {
	const [hover, setHover] = useState(false);
	const [pinned, setPinned] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const expanded = hover || pinned || menuOpen;

	return (
		<aside
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="bg-background fixed bottom-0 left-0 top-0 z-40 hidden flex-col border-r border-border transition-[width] duration-300 ease-[cubic-bezier(.2,0,0,1)] lg:flex"
			style={{ width: expanded ? 220 : 64 }}>
			{/* Logo */}
			<div className="flex h-16 shrink-0 items-center px-3.5">
				<Logo expanded={expanded} />
			</div>

			{/* Nav */}
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

			{/* Footer controls */}
			<div className="flex flex-col gap-0.5 px-2.5 pb-2">
				<ThemeToggle expanded={expanded} onOpenChange={setMenuOpen} />
				<button
					onClick={() => setPinned((p) => !p)}
					aria-label={pinned ? "Unpin sidebar" : "Keep sidebar open"}
					aria-pressed={pinned}
					className={cn(
						"flex h-9 w-full items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
						expanded ? "px-3" : "justify-center",
					)}>
					<PanelLeft
						size={16}
						strokeWidth={1.5}
						className={pinned ? "text-accent-foreground" : ""}
						aria-hidden
					/>
					<span
						className={cn(
							"whitespace-nowrap text-[13.5px] transition-opacity",
							expanded ? "ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
						)}>
						{pinned ? "Unpin sidebar" : "Keep open"}
					</span>
				</button>
				<div className="my-1 h-px bg-border" />
				<LogoutButton expanded={expanded} />
			</div>
		</aside>
	);
};
