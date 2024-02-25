import { cn } from "@/lib/utils";

export interface LogoProps {
	className?: string;
}

export const Logo = ({ className, ...props }: LogoProps) => {
	return (
		<div
			className={cn("text-blue-400 text-3xl font-semibold", className)}
			{...props}>
			litol
			<span className="text-slate-900">.</span>
		</div>
	);
};
