"use client";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsDemo } from "@/hooks/use-is-demo";
import { cn } from "@/lib/utils";
import { AddIcon, QuizIcon, SummaryIcon } from "@/ui/shared/icons";
import Link from "next/link";

const primary = buttonVariants();
const secondary = buttonVariants({ variant: "outline" });

export function DashboardActions() {
	const isDemo = useIsDemo();

	// Below sm the row wraps; the primary leads it instead of orphaning on row two.
	const quiz = (
		<Link
			href="/quiz"
			className={cn(isDemo ? primary : secondary, isDemo && "order-first sm:order-last")}>
			<QuizIcon size={16} strokeWidth={1.75} aria-hidden />
			Take a quiz
		</Link>
	);
	const summary = (
		<Link href="/summary/new" className={cn(secondary)}>
			<SummaryIcon size={16} strokeWidth={1.75} aria-hidden />
			Generate summary
		</Link>
	);

	// The primary always trails. A demo visitor cannot create, so the action
	// they can take (quiz) carries the accent and New note steps down.
	if (isDemo) {
		return (
			<div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
				{summary}
				<Tooltip>
					<TooltipTrigger asChild>
						<span tabIndex={0}>
							<button disabled className={cn(secondary, "pointer-events-none")}>
								<AddIcon size={16} strokeWidth={2} aria-hidden />
								New note
							</button>
						</span>
					</TooltipTrigger>
					<TooltipContent>Not available in demo mode</TooltipContent>
				</Tooltip>
				{quiz}
			</div>
		);
	}

	return (
		<div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
			{quiz}
			{summary}
			<Link href="/note/new" className={cn(primary, "order-first sm:order-last")}>
				<AddIcon size={16} strokeWidth={2} aria-hidden />
				New note
			</Link>
		</div>
	);
}
