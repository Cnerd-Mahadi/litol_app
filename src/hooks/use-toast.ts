"use client";

// Compat shim: maps the legacy useToast()/toast() shape onto sonner.
// Existing call sites keep working; rendering is handled by <Toaster /> (sonner).
import type { ReactNode } from "react";
import { toast as sonner } from "sonner";

type ToastInput = {
	title?: ReactNode;
	description?: ReactNode;
	variant?: "default" | "destructive";
};

export function toast({ title, description, variant }: ToastInput) {
	const message = title ?? "";
	if (variant === "destructive") {
		// Errors persist until dismissed (design system §toasts).
		return sonner.error(message, { description, duration: Infinity });
	}
	return sonner.success(message, { description });
}

export function useToast() {
	return { toast };
}
