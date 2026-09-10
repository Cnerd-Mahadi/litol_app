"use client";

import { SpinnerIcon } from "@/ui/shared/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DemoSignInButton = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const signInAsDemo = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/demo", { method: "POST" });
			if (res.ok) {
				router.push("/");
			} else {
				setLoading(false);
			}
		} catch {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={signInAsDemo}
			disabled={loading}
			className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-ui font-medium text-foreground shadow-(--shadow-card) transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
			{loading ? (
				<SpinnerIcon size={18} className="animate-spin" aria-hidden />
			) : null}
			{loading ? "Loading demo" : "Try demo"}
		</button>
	);
};
