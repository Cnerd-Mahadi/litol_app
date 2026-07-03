"use client";

import { cn } from "@/lib/utils";
import type { ChipColor } from "@/ui/shared/icon-chip";
import { IconChip } from "@/ui/shared/icon-chip";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function GeneratingPanel({
	Icon,
	color,
	heading,
	subtitle,
	steps,
	dwell,
}: {
	Icon: LucideIcon;
	color: ChipColor;
	heading: string;
	subtitle: React.ReactNode;
	steps: string[];
	/** Dwell time (ms) per step before advancing. The last step is the holding
	 * step — it stays pulsing until the real result arrives, so it has no
	 * entry here (dwell.length === steps.length - 1). */
	dwell: number[];
}) {
	const [step, setStep] = useState(0);

	useEffect(() => {
		// Jitter keeps the pacing from feeling scripted.
		const timers: ReturnType<typeof setTimeout>[] = [];
		let acc = 0;
		dwell.forEach((d, i) => {
			acc += d * (0.85 + Math.random() * 0.3);
			timers.push(setTimeout(() => setStep(i + 1), acc));
		});
		return () => timers.forEach(clearTimeout);
	}, [dwell]);

	return (
		<div className="mx-auto max-w-md animate-fade-up pt-10 text-center">
			<IconChip Icon={Icon} color={color} size={64} className="mx-auto mb-7" />
			<div className="text-[17px] font-medium text-foreground">{heading}</div>
			<div className="mt-1 text-[13px] text-muted-foreground">{subtitle}</div>
			<div className="mx-auto mt-7 max-w-xs space-y-2.5 text-left">
				{steps.map((s, i) => (
					<div
						key={i}
						className={cn(
							"flex items-center gap-2.5 text-[13px] transition-colors",
							i <= step ? "text-foreground" : "text-foreground-faint",
						)}>
						<span
							className={cn(
								"grid size-5 place-items-center rounded-full border transition-colors",
								i < step
									? "border-success bg-success text-success-foreground"
									: i === step
										? "border-primary"
										: "border-border",
							)}>
							{i < step ? (
								<Check size={12} strokeWidth={2.5} />
							) : i === step ? (
								<span className="size-2 animate-pulse rounded-md bg-primary" />
							) : (
								<span className="size-1.5 rounded-full bg-foreground-faint" />
							)}
						</span>
						{s}
					</div>
				))}
			</div>
		</div>
	);
}
