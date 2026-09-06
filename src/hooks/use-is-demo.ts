import { authClient } from "@/lib/auth-client";

export function useIsDemo() {
	const { data: session } = authClient.useSession();
	return session?.user?.isDemo ?? false;
}
