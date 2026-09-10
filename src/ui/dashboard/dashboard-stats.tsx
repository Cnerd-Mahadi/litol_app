"use client";

import { useDashboard } from "@/lib/swr/use-dashboard";
import { cn } from "@/lib/utils";

const STATS: {
	key: "noteCount" | "summaryCount" | "subjectCount" | "quizzesTaken";
	label: string;
}[] = [
	{ key: "noteCount", label: "Notes" },
	{ key: "summaryCount", label: "Summaries" },
	{ key: "subjectCount", label: "Subjects" },
	{ key: "quizzesTaken", label: "Quizzes taken" },
];

export function DashboardStats({ className }: { className?: string }) {
	const { data, isLoading } = useDashboard();

	return (
		<dl
			className={cn(
				"grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-4",
				className,
			)}>
			{STATS.map(({ key, label }) => (
				<div
					key={key}
					className="border-border px-4 py-3 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t sm:px-5 sm:[&:not(:first-child)]:border-l sm:[&:nth-child(n+3)]:border-t-0">
					<dt className="text-caption text-muted-foreground">{label}</dt>
					<dd className="mt-1 text-title font-semibold tabular-nums text-foreground">
						{isLoading ? (
							<span className="shimmer inline-block h-5 w-10 rounded bg-muted align-middle" />
						) : (
							(data?.[key] ?? 0)
						)}
					</dd>
				</div>
			))}
		</dl>
	);
}
