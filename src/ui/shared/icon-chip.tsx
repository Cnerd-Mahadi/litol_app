import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// Functional category hues. `color` renders a soft tinted tile; without it the
// chip falls back to the neutral/accent treatment.
export type ChipColor = "blue" | "indigo" | "violet" | "emerald" | "amber";
// Distinct spread for hashed chips — indigo omitted (reads too close to blue).
export const HUES: ChipColor[] = ["blue", "violet", "emerald", "amber"];

const HUE_TILE: Record<ChipColor, string> = {
	blue: "bg-hue-blue-bg text-hue-blue-fg",
	indigo: "bg-hue-indigo-bg text-hue-indigo-fg",
	violet: "bg-hue-violet-bg text-hue-violet-fg",
	emerald: "bg-hue-emerald-bg text-hue-emerald-fg",
	amber: "bg-hue-amber-bg text-hue-amber-fg",
};

export function hueFor(seed: string): ChipColor {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
	return HUES[h % HUES.length];
}

/** Soft tint classes (bg + text) for a hue — shared by chips and pills. */
export function hueChip(color: ChipColor): string {
	return HUE_TILE[color];
}

export function IconChip({
	Icon,
	size = 36,
	className,
	color,
	tone = "neutral",
}: {
	Icon: LucideIcon;
	size?: number;
	className?: string;
	color?: ChipColor;
	tone?: "neutral" | "accent";
}) {
	const styles = color
		? HUE_TILE[color]
		: tone === "accent"
			? "bg-accent text-accent-foreground"
			: "bg-secondary text-muted-foreground ring-1 ring-inset ring-border";
	return (
		<span
			className={cn("grid shrink-0 place-items-center rounded-md", styles, className)}
			style={{ width: size, height: size }}>
			<Icon size={Math.round(size * 0.46)} strokeWidth={1.75} aria-hidden />
		</span>
	);
}
