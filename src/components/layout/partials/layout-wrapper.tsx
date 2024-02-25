"use client";

import { fullWidthPath } from "@/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();

	return (
		<div
			className={
				fullWidthPath.find((item) => pathname.startsWith(item))
					? "mx-auto"
					: "max-w-screen-2xl mx-auto"
			}>
			{children}
		</div>
	);
};
