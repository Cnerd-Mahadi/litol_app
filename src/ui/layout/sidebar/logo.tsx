import { cn } from "@/lib/utils";

export interface LogoProps {
	expanded?: boolean;
	className?: string;
}

export const Logo = ({ expanded = true, className }: LogoProps) => {
	return (
		<div className={cn("flex items-center gap-2.5 overflow-hidden", className)}>
			<div
				className="h-9 w-9 shrink-0 grid place-items-center rounded-xl text-white"
				style={{
					background: "#8b5cf6",
					boxShadow: "0 8px 20px -8px rgba(139,92,246,.8)",
				}}>
				<svg
					width={18}
					height={18}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.75}
					strokeLinecap="round"
					strokeLinejoin="round">
					<path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8Z" />
					<path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z" />
					<path d="M5 4l.5 1.4L7 6l-1.5.6L5 8l-.5-1.4L3 6l1.5-.6Z" />
				</svg>
			</div>
			<div
				className={cn(
					"transition-all duration-200 overflow-hidden",
					expanded ? "opacity-100 w-auto" : "opacity-0 w-0"
				)}>
				<div className="text-[15px] font-semibold tracking-tight leading-none text-ink-100 whitespace-nowrap">
					LITOL
				</div>
				<div className="font-mono text-[9px] uppercase tracking-[.22em] text-ink-600 mt-1 whitespace-nowrap">
					Learn smarter
				</div>
			</div>
		</div>
	);
};
