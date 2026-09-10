"use client";

import { cn } from "@/lib/utils";
import type { ChipColor } from "@/ui/shared/icon-chip";
import { CheckIcon } from "@/ui/shared/icons";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function GeneratingPanel({
	Icon,
	heading,
	subtitle,
	steps,
	dwell,
}: {
	Icon: LucideIcon;
	color?: ChipColor;
	heading: string;
	subtitle: React.ReactNode;
	steps: string[];
	dwell: number[];
}) {
	const [step, setStep] = useState(0);

	useEffect(() => {
		const timers: ReturnType<typeof setTimeout>[] = [];
		let acc = 0;
		dwell.forEach((d, i) => {
			acc += d * (0.85 + Math.random() * 0.3);
			timers.push(setTimeout(() => setStep(i + 1), acc));
		});
		return () => timers.forEach(clearTimeout);
	}, [dwell]);

	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="mx-auto max-w-sm animate-fade-up text-center">
				<span className="mx-auto mb-6 grid size-14 place-items-center rounded-lg border border-border bg-card text-foreground">
					<Icon size={24} strokeWidth={1.5} aria-hidden />
				</span>
				<div className="text-heading font-semibold text-foreground">{heading}</div>
				<div className="mt-1 text-caption text-muted-foreground">{subtitle}</div>
				<div className="mx-auto mt-8 max-w-70 space-y-3 text-left">
					{steps.map((s, i) => (
						<div
							key={i}
							className={cn(
								"flex items-center gap-3 text-ui transition-colors",
								i <= step ? "text-foreground" : "text-foreground-faint",
							)}>
							<span
								className={cn(
									"grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
									i < step
										? "border-primary bg-primary text-primary-foreground"
										: i === step
											? "border-primary"
											: "border-border-strong",
								)}>
								{i < step ? (
									<CheckIcon size={12} strokeWidth={2.5} />
								) : i === step ? (
									<span className="size-2 animate-pulse rounded-full bg-primary" />
								) : (
									<span className="size-1.5 rounded-full bg-foreground-faint" />
								)}
							</span>
							{s}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
