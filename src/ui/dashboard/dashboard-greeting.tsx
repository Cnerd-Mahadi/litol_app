"use client";

import { authClient } from "@/lib/auth-client";
import { useIsDemo } from "@/hooks/use-is-demo";
import { useReviewDeck } from "@/lib/swr/use-review-deck";
import { useEffect, useState } from "react";

function greetingFor(hour: number) {
	return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

export function DashboardGreeting() {
	const { data, isPending } = authClient.useSession();
	const isDemo = useIsDemo();
	const { data: deck } = useReviewDeck();
	const firstName = isDemo ? null : data?.user?.name?.trim().split(/\s+/)[0];
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
	}, []);

	const due = deck?.length ?? null;
	const dueText =
		due === null
			? null
			: due === 0
				? "No cues to review yet"
				: `${due} ${due === 1 ? "cue" : "cues"} to review`;

	return (
		<div>
			<h1 className="flex min-h-7 items-center gap-2 text-heading font-semibold text-foreground">
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
			<p className="mt-1 flex min-h-5 items-center text-caption text-muted-foreground">
				{now ? (
					<>
						{now.toLocaleDateString("en-US", {
							weekday: "long",
							month: "long",
							day: "numeric",
						})}
						{dueText && (
							<>
								<span className="mx-1.5 text-foreground-faint">·</span>
								{dueText}
							</>
						)}
					</>
				) : (
					<span className="shimmer inline-block h-3 w-56 rounded bg-muted" />
				)}
			</p>
		</div>
	);
}
