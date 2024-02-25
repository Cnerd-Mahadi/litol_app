import signinImage from "@/../public/assets/login.png";
import { Logo } from "@/components/layout/partials/sidebar/logo";
import { LoginButton } from "@/components/layout/sign-in/login-button";
import { isUserAuthenticated } from "@/lib/firebase/admin";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function SignInPage() {
	const isAuthenticated = await isUserAuthenticated();
	if (isAuthenticated) redirect("/");
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="max-w-md md:border-solid border-2 border-slate-200 border-none w-full rounded-lg md:p-10 md:py-12 p-6">
				<Logo className="text-4xl text-center md:text-start" />
				<p className="font-medium text-slate-400 pt-2 text-sm mx-auto text-center md:text-start">
					Revolutionizing your way of learning every day
				</p>
				<Image
					priority
					src={signinImage}
					alt="signin-image"
					className="w-24 mx-auto mt-10 mb-8"
				/>
				<h2 className="font-semibold text-xl text-blue-400 text-center pb-8">
					Sign In
				</h2>
				<LoginButton />
			</div>
		</div>
	);
}
