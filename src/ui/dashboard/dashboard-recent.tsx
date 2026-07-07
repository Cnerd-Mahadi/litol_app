"use client";

import { Card } from "@/components/ui/card";
import { useDashboard } from "@/lib/swr/use-dashboard";
import { timeAgo } from "@/lib/time";
import { NoteIcon, SummaryIcon } from "@/ui/shared/icons";
import Link from "next/link";

export function DashboardRecent() {
	const { data, isLoading, error, mutate } = useDashboard();

	if (isLoading) {
		return (
			<Card className="space-y-1 p-2">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="shimmer h-11 rounded-md bg-muted" />
				))}
			</Card>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-80 flex-col justify-center rounded-lg border border-danger-border bg-danger-bg p-5">
				<p className="text-[13px] text-danger-text">
					Couldn&apos;t load your activity. Check your connection and try again.
				</p>
				<button
					onClick={() => mutate()}
					className="mt-3 w-fit rounded-md border border-border bg-secondary px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					Retry
				</button>
			</div>
		);
	}

	const activity = data?.recentActivity ?? [];

	if (activity.length === 0) {
		return (
			<Card className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
				<p className="text-[13px] text-muted-foreground">
					Your recent notes and summaries show up here.
				</p>
			</Card>
		);
	}

	return (
		<Card className="min-h-80">
			{activity.map((a, i) => {
				const isNote = a.type === "note";
				const href = isNote ? `/note/${a.id}` : `/summary/${a.id}`;
				const Icon = isNote ? NoteIcon : SummaryIcon;
				return (
					<Link
						key={a.id}
						href={href}
						className={`group flex items-center gap-3 px-3.5 py-3 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
							i > 0 ? "border-t border-border" : ""
						}`}>
						<Icon
							size={16}
							strokeWidth={1.5}
							aria-hidden
							className={`shrink-0 ${isNote ? "text-hue-blue-fg" : "text-hue-violet-fg"}`}
						/>
						<div className="min-w-0 flex-1">
							<div className="truncate text-[13.5px] text-foreground">
								{a.title}
							</div>
						</div>
						<span className="shrink-0 text-[12px] tabular-nums text-foreground-faint">
							{timeAgo(a.createdAt)}
						</span>
					</Link>
				);
			})}
		</Card>
	);
}
