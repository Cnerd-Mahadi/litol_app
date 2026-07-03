"use client";

import { useDashboard } from "@/lib/swr/use-dashboard";
import { FileText, GraduationCap, Layers, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Hue = "blue" | "violet" | "emerald" | "amber";

const HUE: Record<Hue, { tile: string; hover: string }> = {
	blue: { tile: "bg-hue-blue-bg text-hue-blue-fg", hover: "hover:border-hue-blue-fg/40" },
	violet: { tile: "bg-hue-violet-bg text-hue-violet-fg", hover: "hover:border-hue-violet-fg/40" },
	emerald: { tile: "bg-hue-emerald-bg text-hue-emerald-fg", hover: "hover:border-hue-emerald-fg/40" },
	amber: { tile: "bg-hue-amber-bg text-hue-amber-fg", hover: "hover:border-hue-amber-fg/40" },
};

const STATS: {
	key: "noteCount" | "summaryCount" | "subjectCount" | "quizzesTaken";
	label: string;
	Icon: LucideIcon;
	hue: Hue;
}[] = [
	{ key: "noteCount", label: "Notes", Icon: FileText, hue: "blue" },
	{ key: "summaryCount", label: "Summaries", Icon: Sparkles, hue: "violet" },
	{ key: "subjectCount", label: "Subjects", Icon: Layers, hue: "emerald" },
	{ key: "quizzesTaken", label: "Quizzes taken", Icon: GraduationCap, hue: "amber" },
];

function StatSkeleton() {
	return (
		<div className="shimmer h-20 rounded-xl border border-border bg-card" />
	);
}

export function DashboardStats() {
	const { data, isLoading } = useDashboard();

	return (
		<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
			{isLoading
				? STATS.map((s) => <StatSkeleton key={s.key} />)
				: STATS.map(({ key, label, Icon, hue }) => {
						const value = data?.[key] ?? 0;
						return (
							<div
								key={key}
								className={`lift flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 sm:p-5 ${HUE[hue].hover}`}>
								<div className="min-w-0">
									<div className="truncate text-[12px] font-medium text-muted-foreground">
										{label}
									</div>
									<div className="mt-1.5 text-[20px] font-semibold leading-none tabular-nums text-foreground">
										{value}
									</div>
								</div>
								<span
									className={`grid size-10 shrink-0 place-items-center rounded-xl ${HUE[hue].tile}`}>
									<Icon size={19} strokeWidth={1.75} aria-hidden />
								</span>
							</div>
						);
					})}
		</div>
	);
}
