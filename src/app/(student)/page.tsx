import { FEATURES, FeatureKey } from "@/lib/dummy-data";
import { DashboardGreeting } from "@/ui/dashboard/dashboard-greeting";
import { DashboardRecent } from "@/ui/dashboard/dashboard-recent";
import { DashboardStats } from "@/ui/dashboard/dashboard-stats";
import { RecallCard } from "@/ui/dashboard/recall-card";
import {
	AddIcon,
	ClockIcon,
	ExternalIcon,
	NoteIcon,
	QuizIcon,
	SummaryIcon,
	ZapIcon,
} from "@/ui/shared/icons";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const ACTION_ICON: Record<string, LucideIcon> = {
	sparkles: SummaryIcon,
	chat: NoteIcon,
	quiz: QuizIcon,
};

// Each feature gets a functional hue — chrome stays blue, content gets identity.
const ACTION_HUE: Record<FeatureKey, { tile: string; hover: string }> = {
	summary: {
		tile: "bg-hue-violet-bg text-hue-violet-fg",
		hover: "group-hover:text-hue-violet-fg",
	},
	qa: {
		tile: "bg-hue-blue-bg text-hue-blue-fg",
		hover: "group-hover:text-hue-blue-fg",
	},
	quiz: {
		tile: "bg-hue-amber-bg text-hue-amber-fg",
		hover: "group-hover:text-hue-amber-fg",
	},
};

export default function DashPage() {
	return (
		<div className="animate-fade-up">
			<div>
				<div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-6 sm:py-8 xl:px-12">
					<div>
						<DashboardGreeting />
						<p className="mt-1 text-[14px] text-muted-foreground">
							Pick up where you left off, or start something new.
						</p>
					</div>
					<div className="flex shrink-0 items-center gap-2.5">
						<Link
							href="/quiz"
							className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-border-strong hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
							<QuizIcon size={16} strokeWidth={1.75} aria-hidden />
							Take a quiz
						</Link>
						<Link
							href="/note/new"
							className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13.5px] font-medium text-primary-foreground shadow-(--shadow-btn) transition-[filter] hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
							<AddIcon size={16} strokeWidth={2} aria-hidden />
							New note
						</Link>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-[1180px] px-4 pb-8 pt-2 sm:px-6 sm:pb-10 xl:px-12">
				<DashboardStats />

				<div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
					<div className="min-w-0">
						<h2 className="mb-3.5 text-[12px] font-medium uppercase tracking-[0.06em] text-foreground-faint">
							Quick recall
						</h2>
						<RecallCard />
					</div>
					<div className="min-w-0">
						<div className="mb-3.5 flex items-center gap-1.5 text-foreground-faint">
							<ClockIcon size={13} strokeWidth={1.5} aria-hidden />
							<h2 className="text-[12px] font-medium uppercase tracking-[0.06em]">
								Recent activity
							</h2>
						</div>
						<DashboardRecent />
					</div>
				</div>

				<section className="mt-12">
					<div className="mb-3.5 flex items-center gap-1.5 text-foreground-faint">
						<ZapIcon size={13} strokeWidth={1.5} aria-hidden />
						<h2 className="text-[12px] font-medium uppercase tracking-[0.06em]">
							Start something
						</h2>
					</div>
					<div className="grid gap-4 sm:grid-cols-3">
						{(["summary", "qa", "quiz"] as FeatureKey[]).map((key) => {
							const f = FEATURES[key];
							const Icon = ACTION_ICON[f.icon];
							const hue = ACTION_HUE[key];
							return (
								<Link
									key={key}
									href={f.route}
									className="lift group flex h-full flex-col rounded-xl border border-border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
									<div className="flex items-center justify-between">
										<span
											className={`grid size-11 place-items-center rounded-xl ${hue.tile}`}>
											<Icon size={22} strokeWidth={1.75} aria-hidden />
										</span>
										<ExternalIcon
											size={17}
											strokeWidth={1.75}
											aria-hidden
											className={`text-foreground-faint transition-colors ${hue.hover}`}
										/>
									</div>
									<div className="mt-5 text-[16px] font-medium text-foreground">
										{f.title}
									</div>
									<div className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
										{f.desc}
									</div>
								</Link>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
