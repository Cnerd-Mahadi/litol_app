"use client";

import { authClient } from "@/lib/auth-client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActiveTheme } from "@/hooks/use-active-theme";
import { Logo } from "@/ui/layout/sidebar/logo";
import { CheckIcon, LogoutIcon } from "@/ui/shared/icons";
import { UserAvatar } from "@/ui/shared/user-avatar";
import { themeOptions } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MobileTopbar = () => {
	const router = useRouter();
	const { data } = authClient.useSession();
	const user = data?.user;
	const { activeTheme, setTheme } = useActiveTheme();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		await authClient.signOut();
		router.push("/signin");
	};

	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur lg:hidden">
			<Logo expanded={false} />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						aria-label="Account menu"
						className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<UserAvatar
							name={user?.name}
							email={user?.email}
							image={user?.image}
							size={30}
						/>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-44">
					<DropdownMenuLabel className="truncate font-normal text-muted-foreground">
						{user?.email ?? "Signed in"}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{themeOptions.map(({ value, label, Icon }) => (
						<DropdownMenuItem key={value} onClick={() => setTheme(value)}>
							<Icon size={14} strokeWidth={1.5} aria-hidden />
							<span className="flex-1">{label}</span>
							{activeTheme === value && <CheckIcon size={13} strokeWidth={2} aria-hidden />}
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem
						variant="destructive"
						disabled={loading}
						onClick={handleLogout}>
						<LogoutIcon size={14} strokeWidth={1.5} aria-hidden />
						{loading ? "Signing out…" : "Log out"}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
