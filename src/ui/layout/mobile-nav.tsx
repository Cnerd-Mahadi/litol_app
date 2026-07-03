"use client";

import { cn } from "@/lib/utils";
import { navItems } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
	const path = usePathname();

	return (
		<nav
			aria-label="Primary"
			className="bg-card fixed inset-x-0 bottom-0 z-40 flex border-t border-border lg:hidden"
			style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
			{navItems.map(({ name, route, Icon }) => {
				const isActive =
					(path.startsWith(route) && route !== "/") ||
					(route === "/" && path === "/");
				return (
					<Link
						key={name}
						href={route}
						aria-current={isActive ? "page" : undefined}
						className={cn(
							"flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
							isActive ? "text-link" : "text-muted-foreground",
						)}>
						<Icon size={20} strokeWidth={1.5} aria-hidden />
						<span>{name}</span>
					</Link>
				);
			})}
		</nav>
	);
};
