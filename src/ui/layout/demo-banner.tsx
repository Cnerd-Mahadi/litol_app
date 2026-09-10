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
		<div className="sticky top-14 lg:top-0 z-20 w-full bg-violet-600 px-4 py-2 text-center text-[13px] text-white">
			You are in demo mode. Notes, summaries, and subjects cannot be created or changed.{" "}
			<button
				onClick={handleSignIn}
				className="font-semibold underline underline-offset-2 hover:opacity-80">
				Sign in
			</button>{" "}
			to get started with your own content.
		</div>
	);
}
