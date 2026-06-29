"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const LogoutButton = ({ expanded = true }: { expanded?: boolean }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		setLoading(true);
		await authClient.signOut();
		router.push("/signin");
	};

	return (
		<button
			onClick={handleLogout}
			disabled={loading}
			title="Log out"
			className={cn(
				"w-full flex items-center h-9 rounded-lg text-ink-600 hover:text-red-300 hover:bg-red-500/10 transition disabled:opacity-50",
				expanded ? "px-3 gap-2.5" : "justify-center"
			)}>
			<svg
				width={15}
				height={15}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="shrink-0">
				<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
				<path d="M10 12H3M6 8l-4 4 4 4" />
			</svg>
			<span
				className={cn(
					"text-[12px] whitespace-nowrap transition-opacity",
					expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
				)}>
				{loading ? "Signing out…" : "Log out"}
			</span>
		</button>
	);
};
