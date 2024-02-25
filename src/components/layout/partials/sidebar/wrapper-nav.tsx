"use client";

import { fullWidthPath } from "@/utils";
import { usePathname } from "next/navigation";
import { SideBar } from ".";
import { Topbar } from "../mobile";

export const WrapperNav = () => {
	const pathname = usePathname();
	return (
		<div
			className={
				fullWidthPath.find((item) => pathname.startsWith(item))
					? "hidden"
					: "block"
			}>
			<nav id="sidenav" className="hidden lg:block">
				<SideBar />
			</nav>
			<nav className="block lg:hidden">
				<Topbar />
			</nav>
		</div>
	);
};
