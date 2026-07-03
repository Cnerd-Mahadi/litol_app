import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface LogoProps {
	expanded?: boolean;
	iconSize?: number;
	boxClassName?: string;
	className?: string;
}

export const Logo = ({
	expanded = true,
	iconSize = 17,
	boxClassName = "size-8",
	className,
}: LogoProps) => {
	return (
		<div className={cn("flex items-center gap-2.5 overflow-hidden", className)}>
			<div
				className={cn(
					"grid shrink-0 place-items-center rounded-md bg-primary text-primary-foreground",
					boxClassName,
				)}>
				<Sparkles size={iconSize} strokeWidth={1.5} aria-hidden />
			</div>
			<div
				className={cn(
					"overflow-hidden transition-all duration-200",
					expanded ? "w-auto opacity-100" : "w-0 opacity-0",
				)}>
				<div className="whitespace-nowrap text-[15px] font-semibold leading-none tracking-tight text-foreground">
					LITOL
				</div>
				<div className="mt-1 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-foreground-faint">
					Learn smarter
				</div>
			</div>
		</div>
	);
};
