"use client";

// Compat shim: maps the legacy useToast()/toast() shape onto sonner.
// Uses toast.custom() so the entire card is our own markup (icon, text,
// dismiss button) instead of sonner's default layout + built-in close
// button, which rendered as a floating circle half-off the top-left
// corner of the card and couldn't be restyled cleanly.
import { CircleAlert, CircleCheck, X } from "lucide-react";
import type { ReactNode } from "react";
import { toast as sonner } from "sonner";

type ToastInput = {
	title?: ReactNode;
	description?: ReactNode;
	variant?: "default" | "destructive";
};

function ToastContent({
	variant,
	title,
	description,
	onDismiss,
}: {
	variant: "success" | "error";
	title: ReactNode;
	description?: ReactNode;
	onDismiss: () => void;
}) {
	const Icon = variant === "error" ? CircleAlert : CircleCheck;
	const iconColor = variant === "error" ? "text-danger-text" : "text-success-text";

	return (
		<div className="flex w-89 max-w-full items-start gap-2.5 rounded-lg border border-border-strong bg-card p-4 text-card-foreground shadow-lg">
			<Icon size={16} strokeWidth={2} className={`mt-0.5 shrink-0 ${iconColor}`} />
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="text-[13.5px] font-semibold text-foreground">{title}</span>
				{description && (
					<p className="text-[12.5px] leading-relaxed text-muted-foreground">
						{description}
					</p>
				)}
			</div>
			<button
				type="button"
				aria-label="Dismiss"
				onClick={onDismiss}
				className="grid size-6 shrink-0 place-items-center rounded-md text-foreground-faint transition-colors hover:bg-accent hover:text-foreground">
				<X size={14} strokeWidth={1.75} />
			</button>
		</div>
	);
}

export function toast({ title, description, variant }: ToastInput) {
	const isError = variant === "destructive";
	return sonner.custom(
		(id) => (
			<ToastContent
				variant={isError ? "error" : "success"}
				title={title ?? ""}
				description={description}
				onDismiss={() => sonner.dismiss(id)}
			/>
		),
		// Errors get more time to read than success, but still auto-dismiss.
		{ duration: isError ? 6000 : 4000 },
	);
}

export function useToast() {
	return { toast };
}
