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
				<p className="text-caption text-danger-text">
					Couldn&apos;t load your activity. Check your connection and try again.
				</p>
				<button
					onClick={() => mutate()}
					className="mt-3 w-fit rounded-md border border-border bg-secondary px-3 py-1.5 text-caption font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
					Retry
				</button>
			</div>
		);
	}

	const activity = data?.recentActivity ?? [];

	if (activity.length === 0) {
		return (
			<Card className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
				<p className="text-caption text-muted-foreground">
					Your recent notes and summaries show up here.
				</p>
			</Card>
		);
	}

	return (
		<Card className="flex min-h-80 flex-col">
			{activity.map((a, i) => {
				const isNote = a.type === "note";
				const href = isNote ? `/note/${a.id}` : `/summary/${a.id}`;
				const Icon = isNote ? NoteIcon : SummaryIcon;
				return (
					<Link
						key={a.id}
						href={href}
						className={`group flex h-11 items-center gap-3 px-3.5 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
							i > 0 ? "border-t border-border" : ""
						}`}>
						<Icon
							size={16}
							strokeWidth={1.5}
							aria-hidden
							className="shrink-0 text-foreground-faint transition-colors group-hover:text-foreground"
						/>
						<div className="min-w-0 flex-1">
							<div className="truncate text-ui text-foreground">
								{a.title}
							</div>
						</div>
						<span className="shrink-0 text-caption tabular-nums text-foreground-faint">
							{timeAgo(a.createdAt)}
						</span>
					</Link>
				);
			})}
			<div className="mt-auto flex items-center justify-between rounded-b-lg border-t border-border px-3.5 py-2.5 text-caption text-muted-foreground">
				<span>Latest {activity.length}</span>
				<span className="flex items-center gap-3">
					<Link href="/note" className="transition-colors hover:text-foreground">
						All notes
					</Link>
					<Link href="/summary" className="transition-colors hover:text-foreground">
						All summaries
					</Link>
				</span>
			</div>
		</Card>
	);
}
