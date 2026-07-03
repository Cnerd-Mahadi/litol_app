import { GoogleSignInButton } from "@/ui/layout/signin/google-signin-button";

export default function SignInPage() {
	return (
		<>
			<h1 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground sm:text-[24px]">
				Sign in
			</h1>
			<p className="mt-2 text-[14px] text-muted-foreground">
				Welcome back. Pick up where you left off.
			</p>
			<div className="mt-8">
				<GoogleSignInButton />
			</div>
			<div className="my-6 flex items-center gap-3">
				<div className="h-px flex-1 bg-border" />
				<span className="whitespace-nowrap text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
					Secure sign-in
				</span>
				<div className="h-px flex-1 bg-border" />
			</div>
			<p className="text-center text-[12px] text-muted-foreground">
				Google sign-in only. No passwords to remember.
			</p>
		</>
	);
}
