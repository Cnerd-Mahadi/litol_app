"use client";

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { navItems } from "@/utils";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { LogoutButton } from "./logout-button";
import { NavItem } from "./nav-item";

function ThemeToggle({ expanded }: { expanded: boolean }) {
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		const stored = localStorage.getItem("litol_theme") as
			| "dark"
			| "light"
			| null;
		const initial =
			stored ??
			(document.documentElement.classList.contains("light") ? "light" : "dark");
		setTheme(initial);
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(initial);
	}, []);

	const flip = () => {
		const next = theme === "dark" ? "light" : "dark";
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(next);
		localStorage.setItem("litol_theme", next);
		setTheme(next);
	};

	const IcoTheme = theme === "dark" ? Icons.moon : Icons.sun;

	return (
		<button
			onClick={flip}
			className={cn(
				"w-full flex items-center h-9 rounded-lg text-ink-500 hover:text-ink-200 hover:bg-fill2 transition",
				expanded ? "px-3" : "justify-center",
			)}>
			<span className="shrink-0">
				<IcoTheme size={15} />
			</span>
			<span
				className={cn(
					"ml-2.5 text-[12px] whitespace-nowrap transition-opacity flex-1 text-left",
					expanded ? "opacity-100" : "opacity-0 w-0",
				)}>
				{theme === "dark" ? "Dark" : "Light"} mode
			</span>
			{expanded && (
				<span
					className="relative shrink-0 rounded-full transition-colors"
					style={{
						height: 18,
						width: 32,
						background: theme === "light" ? "#8b5cf6" : "var(--line2)",
					}}>
					<span
						className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white transition-all"
						style={{ left: theme === "light" ? 16 : 2 }}
					/>
				</span>
			)}
		</button>
	);
}

export const SideBar = () => {
	const [hover, setHover] = useState(false);
	const [pinned, setPinned] = useState(false);
	const expanded = hover || pinned;

	return (
		<aside
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r transition-[width] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
			style={{
				width: expanded ? 220 : 64,
				background: "var(--surface)",
				borderColor: "var(--line)",
			}}>
			{/* Logo */}
			<div className="h-16 flex items-center px-3.5 shrink-0">
				<Logo expanded={expanded} />
			</div>

			{/* Nav */}
			<nav className="flex-1 px-2.5 pt-2 flex flex-col gap-1 overflow-hidden">
				<div
					className={cn(
						"px-2.5 mb-1 font-mono text-[9px] uppercase tracking-[.22em] text-ink-700 transition-opacity whitespace-nowrap",
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

			{/* Logout */}
			<div className="px-2.5 pb-0 flex flex-col">
				<LogoutButton expanded={expanded} />
			</div>

			{/* Theme + Pin */}
			<div className="px-2.5 pb-1.5 flex flex-col gap-0.5">
				<ThemeToggle expanded={expanded} />
				<button
					onClick={() => setPinned((p) => !p)}
					className={cn(
						"w-full flex items-center h-9 rounded-lg text-ink-600 hover:text-ink-300 hover:bg-fill2 transition",
						expanded ? "px-3" : "justify-center",
					)}>
					<Icons.pin size={15} className={pinned ? "text-accentFg" : ""} />
					<span
						className={cn(
							"ml-2.5 text-[12px] whitespace-nowrap transition-opacity",
							expanded ? "opacity-100" : "opacity-0 w-0",
						)}>
						{pinned ? "Unpin sidebar" : "Keep open"}
					</span>
				</button>
			</div>
		</aside>
	);
};
