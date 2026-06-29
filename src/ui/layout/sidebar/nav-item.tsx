"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IconComponent {
  (props: { size?: number; className?: string }): React.ReactElement | null;
}

export interface NavItemProps {
  route: string;
  title: string;
  Icon: IconComponent;
  expanded: boolean;
}

const ROUTE_COLORS: Record<string, string> = {
  "/":        "#a1a1aa",
  "/summary": "#a78bfa",
  "/note":    "#38bdf8",
  "/quiz":    "#fbbf24",
};

export const NavItem = ({ route, title, Icon, expanded }: NavItemProps) => {
  const path = usePathname();
  const isActive =
    (path.startsWith(route) && route !== "/") ||
    (route === "/" && path === "/");
  const color = ROUTE_COLORS[route] ?? "#a1a1aa";

  return (
    <Link
      href={route}
      className={cn(
        "group relative flex items-center h-10 rounded-xl transition-all duration-150 overflow-hidden",
        isActive ? "bg-fill3" : "hover:bg-fill2"
      )}
      style={{ paddingLeft: 12 }}>
      {isActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full"
          style={{ background: color }}
        />
      )}
      <span
        className="shrink-0 w-6 grid place-items-center transition-colors"
        style={{ color: isActive ? color : undefined }}>
        <Icon
          size={19}
          className={isActive ? "" : "text-ink-500 group-hover:text-ink-300"}
        />
      </span>
      <span
        className={cn(
          "ml-3 text-[13.5px] font-medium whitespace-nowrap transition-all duration-200",
          isActive ? "text-ink-100" : "text-ink-400 group-hover:text-ink-200",
          expanded ? "opacity-100" : "opacity-0 w-0"
        )}>
        {title}
      </span>
      {isActive && expanded && (
        <span
          className="ml-auto mr-3 h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: color }}
        />
      )}
    </Link>
  );
};
