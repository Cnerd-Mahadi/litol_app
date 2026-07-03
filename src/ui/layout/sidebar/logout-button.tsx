"use client";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
			aria-label="Log out"
			className={cn(
				"flex h-9 w-full items-center rounded-md text-muted-foreground transition-colors",
				"hover:bg-danger-bg hover:text-danger-text",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"disabled:opacity-50",
				expanded ? "gap-2.5 px-3" : "justify-center",
			)}>
			<LogOut size={16} strokeWidth={1.5} className="shrink-0" aria-hidden />
			<span
				className={cn(
					"whitespace-nowrap text-[13px] transition-opacity",
					expanded ? "opacity-100" : "w-0 overflow-hidden opacity-0",
				)}>
				{loading ? "Signing out…" : "Log out"}
			</span>
		</button>
	);
};
