import { Logo } from "@/ui/layout/sidebar/logo";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
			<div className="relative hidden flex-col border-r border-border bg-sidebar p-12 lg:flex">
				<Logo iconSize={20} boxClassName="size-10" />

				<div className="my-auto max-w-md">
					<h2 className="text-display font-semibold text-foreground">
						Your AI study partner for everything you learn.
					</h2>
					<p className="mt-3 text-ui leading-relaxed text-muted-foreground">
						Summarize and quiz any subject, grounded in your own notes.
					</p>
					<div className="mt-7 flex items-center gap-5 text-caption text-muted-foreground">
						<span className="flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-hue-violet-fg" />
							Summaries
						</span>
						<span className="flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-hue-blue-fg" />
							Notes
						</span>
						<span className="flex items-center gap-1.5">
							<span className="size-1.5 rounded-full bg-hue-amber-fg" />
							Quizzes
						</span>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center p-6">
				<div className="w-full max-w-95 animate-fade-up">
					<div className="mb-10 flex justify-center lg:hidden">
						<Logo iconSize={18} boxClassName="size-9" />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
