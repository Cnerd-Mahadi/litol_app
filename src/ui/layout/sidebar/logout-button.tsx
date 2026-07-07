"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LogoutIcon } from "@/ui/shared/icons";
import { UserAvatar } from "@/ui/shared/user-avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LogoutButton = ({ expanded = true }: { expanded?: boolean }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	const displayName = user?.name?.trim().split(/\s+/).slice(0, 2).join(" ");

	const handleLogout = async () => {
		setLoading(true);
		await authClient.signOut();
		router.push("/signin");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-label="Account menu"
					className="flex h-9 w-full items-center rounded-md px-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					<UserAvatar name={user?.name} email={user?.email} image={user?.image} size={22} />
					{isPending ? (
						<span
							className={cn(
								"overflow-hidden transition-all duration-200",
								expanded ? "flex-1 ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
							)}>
							<span className="shimmer block h-3 w-16 rounded bg-muted" />
						</span>
					) : (
						<span
							className={cn(
								"whitespace-nowrap overflow-hidden text-left text-[13px] transition-all duration-200",
								expanded ? "flex-1 ml-2.5 opacity-100" : "ml-0 w-0 opacity-0",
							)}>
							{displayName || "Account"}
						</span>
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="top" className="w-48">
				<DropdownMenuLabel className="truncate font-normal text-muted-foreground">
					{user?.email ?? "Signed in"}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" disabled={loading} onClick={handleLogout}>
					<LogoutIcon size={14} strokeWidth={1.5} aria-hidden />
					{loading ? "Signing out…" : "Log out"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
