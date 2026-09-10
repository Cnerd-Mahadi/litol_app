import { GoogleSignInButton } from "@/ui/layout/signin/google-signin-button";
import { DemoSignInButton } from "@/ui/layout/signin/demo-signin-button";

export default function SignInPage() {
	return (
		<>
			<h1 className="text-heading font-semibold text-foreground">Sign in</h1>
			<p className="mt-1 text-caption text-muted-foreground">
				Welcome back. Pick up where you left off.
			</p>
			<div className="mt-8 flex flex-col gap-3">
				<GoogleSignInButton />
				<DemoSignInButton />
				<p className="text-center text-caption text-muted-foreground">
					Demo is AI-only. Sign in to create content.
				</p>
			</div>
			<div className="my-5 h-px bg-border" />
			<p className="text-center text-micro text-foreground-faint">
				Google sign-in only · No passwords to remember.
			</p>
		</>
	);
}
