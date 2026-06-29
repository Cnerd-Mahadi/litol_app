import { GoogleSignInButton } from "@/ui/layout/signin/google-signin-button";

export default function SignInPage() {
	return (
		<div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr]" style={{ background: "rgb(var(--bg))" }}>
			<div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r" style={{ borderColor: "var(--line)" }}>
				<div className="absolute inset-0 grid-bg opacity-70" />
				<div className="absolute -top-24 -left-24 h-[460px] w-[460px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,.28), transparent 70%)", filter: "blur(120px)" }} />
				<div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full" style={{ background: "radial-gradient(circle, rgba(56,189,248,.16), transparent 70%)", filter: "blur(120px)" }} />
				<div className="relative flex items-center gap-3">
					<div className="h-11 w-11 grid place-items-center rounded-xl text-white" style={{ background: "#8b5cf6", boxShadow: "0 10px 30px -8px rgba(139,92,246,.9)" }}>
						<svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
							<path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8Z" />
							<path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7Z" />
							<path d="M5 4l.5 1.4L7 6l-1.5.6L5 8l-.5-1.4L3 6l1.5-.6Z" />
						</svg>
					</div>
					<div>
						<div className="text-lg font-semibold tracking-tight text-ink-100">LITOL</div>
						<div className="font-mono text-[10px] uppercase tracking-[.22em] text-ink-600 whitespace-nowrap">Learn smarter</div>
					</div>
				</div>
				<div className="relative flex-1 grid place-items-center py-10">
					<div className="relative w-[360px] h-[300px]">
						<svg viewBox="0 0 360 300" className="absolute inset-0 w-full h-full">
							<g stroke="rgba(139,92,246,.35)" strokeWidth="1.5" fill="none">
								<path d="M180 150 L70 70" /><path d="M180 150 L300 60" /><path d="M180 150 L80 230" /><path d="M180 150 L290 220" /><path d="M180 150 L180 40" />
							</g>
							<g>
								{([[70,70,"#a78bfa"],[300,60,"#38bdf8"],[80,230,"#34d399"],[290,220,"#fbbf24"],[180,40,"#a78bfa"]] as [number,number,string][]).map(([x,y,c],i) => (
									<circle key={i} cx={x} cy={y} r="8" fill={c} opacity="0.9" className="animate-pulse-soft" style={{ animationDelay: `${i*0.25}s` }} />
								))}
							</g>
							<circle cx="180" cy="150" r="22" fill="#8b5cf6" />
							<circle cx="180" cy="150" r="22" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity=".4" className="animate-pulse-soft" />
						</svg>
					</div>
				</div>
				<div className="relative max-w-md">
					<h2 className="text-[28px] font-semibold tracking-tight leading-tight text-ink-100">Your AI study partner for everything you learn.</h2>
					<p className="text-[14px] text-ink-400 mt-3 leading-relaxed">Summarize, question, and map any subject — grounded in your own material.</p>
					<div className="flex items-center gap-5 mt-7 font-mono text-[11px] uppercase tracking-[.16em] text-ink-600">
						<span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-feat-summary" />Summarize</span>
						<span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-feat-qa" />Ask</span>
					</div>
				</div>
			</div>
			<div className="relative flex items-center justify-center p-6">
				<div className="w-full max-w-[380px] animate-fade-up">
					<div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
						<div className="h-10 w-10 grid place-items-center rounded-xl text-white" style={{ background: "#8b5cf6" }}>
							<svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
								<path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8Z" />
							</svg>
						</div>
						<span className="text-lg font-semibold tracking-tight text-ink-100">LITOL</span>
					</div>
					<h1 className="text-[24px] font-semibold tracking-tight text-ink-100">Sign in</h1>
					<p className="text-[14px] text-ink-400 mt-2">Welcome back. Pick up where you left off.</p>
					<div className="mt-8"><GoogleSignInButton /></div>
					<div className="flex items-center gap-3 my-6">
						<div className="h-px flex-1" style={{ background: "var(--line)" }} />
						<span className="font-mono text-[10px] uppercase tracking-[.2em] text-ink-700 whitespace-nowrap">Secure sign-in</span>
						<div className="h-px flex-1" style={{ background: "var(--line)" }} />
					</div>
					<p className="text-[12px] text-ink-600 text-center">Google sign-in only — no passwords to remember.</p>
				</div>
			</div>
		</div>
	);
}
