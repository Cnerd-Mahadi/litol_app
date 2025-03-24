"use client";

import googleImage from "@/../public/assets/google.png";
import { useToast } from "@/components/ui/use-toast";
import { auth, saveSession } from "@/lib/firebase/client";
import { useProgress } from "@bprogress/next";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";

export const LoginButton = () => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const progress = useProgress();

	const loginWithGoogle = async () => {
		setLoading(true);
		await signInWithPopup(auth, new GoogleAuthProvider()).then(
			async (result) => {
				const user = result.user;
				const idToken = await result.user.getIdToken();

				if (idToken) {
					const isOk = await saveSession(idToken, user);

					if (isOk) {
						progress.start();
						router.push("/");
						progress.enableAutoStop();
					} else {
						setLoading(false);
						progress.stop();
						toast({
							title: "Sorry!",
							description: "Something went wrong! Please try again.",
						});
					}
				}

				if (!idToken) {
					toast({
						title: "Oops!",
						description: "Something went wrong! Please try again.",
					});
					setLoading(false);
				}
			}
		);
	};

	return (
		<Button
			onClick={loginWithGoogle}
			variant={"outline"}
			disabled={loading ? true : false}
			className="flex flex-row justify-center items-center gap-3 mx-auto px-8 py-5 rounded-full w-full max-w-60">
			<Image src={googleImage} alt="google-image" className="w-4" />
			<p className="font-medium text-blue-500 text-sm">Google</p>
		</Button>
	);
};
