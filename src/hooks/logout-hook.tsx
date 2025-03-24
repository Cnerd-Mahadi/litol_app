import { useToast } from "@/components/ui/use-toast";
import { signOut } from "@/lib/firebase/client";
import { useProgress } from "@bprogress/next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogOut = () => {
	const router = useRouter();
	const progress = useProgress();
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	const handleLogOut = async () => {
		setLoading(true);
		progress.start();

		const isOk = await signOut();
		if (isOk) {
			router.push("/signin");
			progress.enableAutoStop();
		} else {
			progress.stop();
			setLoading(false);
			toast({
				title: "Sorry!",
				description: "Something went wrong! Please try again.",
			});
		}
	};

	return { handleLogOut, loading };
};
