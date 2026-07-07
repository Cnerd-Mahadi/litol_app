import { IconChip } from "@/ui/shared/icon-chip";
import { QuizFlow } from "@/ui/quiz/quiz-flow";
import { QuizIcon } from "@/ui/shared/icons";

export default function QuizPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-12">
			<div className="mb-6 flex items-center gap-3.5 sm:items-start">
				<IconChip Icon={QuizIcon} color="amber" size={44} tone="accent" />
				<div>
					<h1 className="text-[20px] font-semibold leading-none tracking-[-0.01em] text-foreground sm:text-[24px]">
						Quiz
					</h1>
					<p className="mt-2 hidden max-w-xl text-[14px] leading-relaxed text-muted-foreground sm:block">
						Pick a subject, select notes, set a focus, and AI generates
						questions grounded in your material.
					</p>
				</div>
			</div>
			<QuizFlow />
		</div>
	);
}
