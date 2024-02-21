"use client";

import googleImage from "@/../public/assets/google.png";
import { auth, googleSignIn, saveSession } from "@/lib/firebase/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getRedirectResult } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";

export const LoginButton = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleLogin = async () => {
		setLoading(true);
		await googleSignIn();
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			const userCred = await getRedirectResult(auth);
			if (userCred) {
				const idToken = await userCred.user.getIdToken();
				const isOk = await saveSession(idToken);
				if (isOk) router.push("/");
			}
			setLoading(false);
		})();
	}, [router]);

	return (
		<Button
			onClick={handleLogin}
			variant={"outline"}
			disabled={loading ? true : false}
			className="px-8 py-5 flex flex-row items-center justify-center rounded-full gap-3 mx-auto max-w-60 w-full">
			{loading ? (
				<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Image src={googleImage} alt="google-image" className="w-4" />
			)}
			<p className="font-medium text-sm text-blue-500">Google</p>
		</Button>
	);
};
