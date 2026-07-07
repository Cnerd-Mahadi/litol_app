"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

function greetingFor(hour: number) {
	return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

export function DashboardGreeting() {
	const { data, isPending } = authClient.useSession();
	const firstName = data?.user?.name?.trim().split(/\s+/)[0];
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
	}, []);

	return (
		<div>
			<div className="mb-1.5 flex min-h-4.5 items-center text-[12px] font-medium uppercase tracking-[0.06em] text-foreground-faint">
				{now ? (
					now.toLocaleDateString("en-US", {
						weekday: "long",
						month: "long",
						day: "numeric",
					})
				) : (
					<span className="shimmer inline-block h-3 w-32 rounded bg-muted align-middle" />
				)}
			</div>
			<h1 className="flex min-h-7.5 items-center gap-2 text-[24px] font-semibold leading-tight tracking-tight text-foreground sm:min-h-8.25 sm:text-[26px]">
				{now ? (
					greetingFor(now.getHours())
				) : (
					<span className="shimmer inline-block h-6 w-40 rounded-md bg-muted" />
				)}
				{isPending ? (
					<span className="shimmer inline-block h-5 w-20 rounded-md bg-muted align-middle" />
				) : firstName ? (
					`, ${firstName}`
				) : null}
			</h1>
		</div>
	);
}
