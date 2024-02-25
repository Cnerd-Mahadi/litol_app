"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useContext } from "react";
import { SheetSideBarContext } from "./sidebar";

export interface NavItemMobileProps {
	route: string;
	title: string;
	Icon: ReactElement;
}

export const NavItemMobile = ({ route, title, Icon }: NavItemMobileProps) => {
	const path = usePathname();
	const context = useContext(SheetSideBarContext);
	if (!context) throw new Error("No Sidebar Context Found!");

	const { setOpen } = context;

	const isActive =
		(path.startsWith(route) && route !== "/") ||
		(route === "/" && path === "/");
	return (
		<Link
			href={route}
			onClick={() => {
				setOpen(false);
			}}
			className="flex flex-row gap-5 py-2 pl-3 rounded-md group">
			<Icon.type
				{...Icon.props}
				className={`${
					isActive ? "text-blue-500" : "text-slate-500"
				} group-hover:text-blue-500 w-5`}
			/>
			<p
				className={`font-medium text-sm ${
					isActive ? "text-blue-500" : "text-slate-400"
				} group-hover:text-blue-500`}>
				{title}
			</p>
		</Link>
	);
};
