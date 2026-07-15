"use client";

import { authClient } from "@/lib/auth-client";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActiveTheme } from "@/hooks/use-active-theme";
import { MOBILE_QUERY, useMediaQuery } from "@/hooks/use-media-query";
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
	const isMobile = useMediaQuery(MOBILE_QUERY);

	const handleLogout = async () => {
		setLoading(true);
		await authClient.signOut();
		router.push("/signin");
	};

	const trigger = (
		<button
			aria-label="Account menu"
			className="rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
			<UserAvatar name={user?.name} email={user?.email} image={user?.image} size={30} />
		</button>
	);

	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur lg:hidden">
			<Logo expanded={false} />
			{isMobile ? (
				<Drawer>
					<DrawerTrigger asChild>{trigger}</DrawerTrigger>
					<DrawerContent>
						<div className="truncate px-4 pt-1 pb-2 text-[13px] text-muted-foreground">
							{user?.email ?? "Signed in"}
						</div>
						<div className="mx-2 h-px bg-border" />
						<div className="flex flex-col gap-1 p-2">
							{themeOptions.map(({ value, label, Icon }) => (
								<DrawerClose asChild key={value}>
									<button
										type="button"
										onClick={() => setTheme(value)}
										className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-[14px] font-medium text-foreground transition-colors active:bg-accent">
										<Icon size={16} strokeWidth={1.5} aria-hidden />
										<span className="flex-1">{label}</span>
										{activeTheme === value && (
											<CheckIcon size={15} strokeWidth={2} aria-hidden />
										)}
									</button>
								</DrawerClose>
							))}
						</div>
						<div className="mx-2 h-px bg-border" />
						<div className="p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
							<DrawerClose asChild>
								<button
									type="button"
									disabled={loading}
									onClick={handleLogout}
									className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-[14px] font-medium text-destructive transition-colors active:bg-accent disabled:opacity-50">
									<LogoutIcon size={16} strokeWidth={1.5} aria-hidden />
									{loading ? "Signing out…" : "Log out"}
								</button>
							</DrawerClose>
						</div>
					</DrawerContent>
				</Drawer>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
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
			)}
		</header>
	);
};
