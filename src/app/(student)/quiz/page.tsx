import { QuizFlow } from "@/ui/quiz/quiz-flow";

export default function QuizPage() {
	return (
		<div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 xl:px-10">
			<div className="mb-6">
				<h1 className="text-heading font-semibold text-foreground">Quiz</h1>
				<p className="mt-1 text-caption text-muted-foreground">
					Pick a subject, select notes, and get questions grounded in your material.
				</p>
			</div>
			<QuizFlow />
		</div>
	);
}
