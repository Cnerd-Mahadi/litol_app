import { DashboardActions } from "@/ui/dashboard/dashboard-actions";
import { DashboardGreeting } from "@/ui/dashboard/dashboard-greeting";
import { DashboardRecent } from "@/ui/dashboard/dashboard-recent";
import { DashboardStats } from "@/ui/dashboard/dashboard-stats";
import { RecallCard } from "@/ui/dashboard/recall-card";
import Link from "next/link";

function SectionHeader({
	title,
	href,
	action,
}: {
	title: string;
	href?: string;
	action?: string;
}) {
	return (
		<div className="mb-3 flex h-6 items-center justify-between">
			<h2 className="text-ui font-medium text-foreground">{title}</h2>
			{href && action && (
				<Link
					href={href}
					className="text-caption text-muted-foreground transition-colors hover:text-foreground">
					{action}
				</Link>
			)}
		</div>
	);
}

export default function DashPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-10">
			<header className="flex flex-wrap items-end justify-between gap-4">
				<DashboardGreeting />
				<DashboardActions />
			</header>

			<DashboardStats className="mt-6" />

			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
				<section className="min-w-0">
					<SectionHeader title="Quick recall" href="/note" action="All notes" />
					<RecallCard />
				</section>
				<section className="min-w-0">
					<SectionHeader title="Recent activity" />
					<DashboardRecent />
				</section>
			</div>
		</div>
	);
}
