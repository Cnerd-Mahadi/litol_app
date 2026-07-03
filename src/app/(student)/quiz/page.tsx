import { IconChip } from "@/ui/shared/icon-chip";
import { QuizFlow } from "@/ui/quiz/quiz-flow";
import { GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

export default function QuizPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<div className="mb-6 flex items-start gap-3.5">
				<IconChip Icon={GraduationCap} color="amber" size={44} tone="accent" />
				<div>
					<div className="mb-1.5 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
						AI quiz
					</div>
					<h1 className="text-[20px] font-semibold leading-none tracking-[-0.01em] text-foreground sm:text-[24px]">
						Quiz
					</h1>
					<p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
						Pick a subject, select notes, set a focus, and AI generates
						questions grounded in your material.
					</p>
				</div>
			</div>
			<QuizFlow />
		</div>
	);
}
