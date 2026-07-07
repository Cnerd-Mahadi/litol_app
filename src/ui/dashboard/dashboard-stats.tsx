"use client";

import { Card } from "@/components/ui/card";
import { useDashboard } from "@/lib/swr/use-dashboard";
import { DeckIcon, NoteIcon, QuizIcon, SummaryIcon } from "@/ui/shared/icons";
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
	{ key: "noteCount", label: "Notes", Icon: NoteIcon, hue: "blue" },
	{ key: "summaryCount", label: "Summaries", Icon: SummaryIcon, hue: "violet" },
	{ key: "subjectCount", label: "Subjects", Icon: DeckIcon, hue: "emerald" },
	{ key: "quizzesTaken", label: "Quizzes taken", Icon: QuizIcon, hue: "amber" },
];

function StatSkeleton() {
	return <Card className="shimmer h-20 rounded-xl" />;
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
							<Card
								key={key}
								className={`lift flex items-center justify-between gap-3 rounded-xl p-4 sm:p-5 ${HUE[hue].hover}`}>
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
							</Card>
						);
					})}
		</div>
	);
}
