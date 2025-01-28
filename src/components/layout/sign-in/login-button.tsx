"use client";

import googleImage from "@/../public/assets/google.png";
import { getResponse } from "@/lib/firebase";
import { auth, saveSession } from "@/lib/firebase/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";

export const LoginButton = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const loginWitnGoogle = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
			const idTOken = await getResponse(codeResponse.code);
			const credential = GoogleAuthProvider.credential(idTOken);

			signInWithCredential(auth, credential).then(async (res) => {
				const idToken = await auth.currentUser?.getIdToken();
				console.log(idTOken, "__________________");
				const isOk = await saveSession(idToken!!);
				if (isOk) router.push("/");
			});
		},
		flow: "auth-code",
	});

	return (
		<Button
			onClick={loginWitnGoogle}
			variant={"outline"}
			disabled={loading ? true : false}
			className="flex flex-row justify-center items-center gap-3 mx-auto px-8 py-5 rounded-full w-full max-w-60">
			{loading ? (
				<ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
			) : (
				<Image src={googleImage} alt="google-image" className="w-4" />
			)}
			<p className="font-medium text-blue-500 text-sm">Google</p>
		</Button>
	);
};
