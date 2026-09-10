"use client";

import { authClient } from "@/lib/auth-client";
import { useIsDemo } from "@/hooks/use-is-demo";
import { useRouter } from "next/navigation";

export function DemoBanner() {
	const isDemo = useIsDemo();
	const router = useRouter();

	if (!isDemo) return null;

	const handleSignIn = async () => {
		await authClient.signOut();
		router.push("/signin");
	};

	return (
		<div className="sticky top-14 z-20 w-full border-b border-notice-border bg-card px-4 py-2 text-center text-caption text-notice-text lg:top-0">
			You are in demo mode. Notes, summaries, and subjects cannot be created or changed.{" "}
			<button
				onClick={handleSignIn}
				className="font-semibold underline decoration-notice-text/40 transition-colors hover:decoration-notice-text">
				Sign in
			</button>{" "}
			to get started with your own content.
		</div>
	);
}
