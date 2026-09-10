"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CloseIcon, SubmitIcon } from "@/ui/shared/icons";
import { useState } from "react";

export type QuizQuestion = {
	question: string;
	options: string[];
	answer: string;
};

export function QuizAnswering({
	label,
	questions,
	onFinish,
}: {
	label: string;
	questions: QuizQuestion[];
	onFinish: (answers: Record<number, number>) => void;
}) {
	const [idx, setIdx] = useState(0);
	const [answers, setAnswers] = useState<Record<number, number>>({});
	const [picked, setPicked] = useState<number | null>(null);
	const q = questions[idx];
	const progress = (idx / questions.length) * 100;

	const choose = (i: number) => {
		if (picked !== null) return;
		setPicked(i);
		setAnswers((a) => ({ ...a, [idx]: i }));
	};

	const next = () => {
		if (idx + 1 >= questions.length) {
			onFinish({ ...answers, [idx]: picked! });
		} else {
			setIdx(idx + 1);
			setPicked(null);
		}
	};

	const optionState = (i: number) => {
		const isCorrect = q.options[i] === q.answer;
		const isPicked = picked === i;
		if (picked === null) return "border-border bg-card hover:bg-secondary/50";
		if (isCorrect) return "border-success-border bg-success-bg";
		if (isPicked) return "border-danger-border bg-danger-bg";
		return "border-border opacity-60";
	};

	return (
		<div className="mx-auto max-w-2xl animate-fade-up">
			<div className="mb-2 flex items-center justify-between text-caption text-muted-foreground">
				<span className="whitespace-nowrap tabular-nums">
					Question {idx + 1}{" "}
					<span className="text-foreground-faint">/ {questions.length}</span>
				</span>
				<span className="max-w-50 truncate text-foreground-faint">{label}</span>
			</div>
			<div className="mb-7 h-1 overflow-hidden rounded-full bg-secondary">
				<div
					className="h-full rounded-full bg-primary transition-all duration-500"
					style={{ width: `${progress}%` }}
				/>
			</div>

			<div key={idx} className="animate-fade-up">
				<h2 className="text-heading font-semibold text-foreground">{q.question}</h2>
				<div className="mt-6 space-y-2">
					{q.options.map((opt, i) => {
						const isCorrect = q.options[i] === q.answer;
						const isPicked = picked === i;
						const showCorrect = picked !== null && isCorrect;
						const showWrong = picked !== null && isPicked && !isCorrect;
						return (
							<button
								key={i}
								onClick={() => choose(i)}
								disabled={picked !== null}
								className={cn(
									"flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-ui text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									optionState(i),
								)}>
								<span
									className={cn(
										"grid size-7 shrink-0 place-items-center rounded-md border text-caption",
										showCorrect
											? "border-success-border text-success-text"
											: showWrong
												? "border-danger-border text-danger-text"
												: "border-border text-muted-foreground",
									)}>
									{showCorrect ? (
										<CheckIcon size={14} strokeWidth={2.5} />
									) : showWrong ? (
										<CloseIcon size={13} strokeWidth={2.5} />
									) : (
										String.fromCharCode(65 + i)
									)}
								</span>
								{opt}
							</button>
						);
					})}
				</div>

				{picked !== null && (
					<div className="mt-5 flex animate-fade-up items-center gap-2 text-caption font-medium">
						{q.options[picked] === q.answer ? (
							<CheckIcon size={15} strokeWidth={2.5} className="text-success-text" />
						) : (
							<CloseIcon size={14} strokeWidth={2.5} className="text-danger-text" />
						)}
						<span className="text-foreground">
							{q.options[picked] === q.answer
								? "Correct"
								: `Not quite. Answer: ${q.answer}`}
						</span>
					</div>
				)}
			</div>

			<div className="mt-6 flex justify-end">
				<Button onClick={next} disabled={picked === null} size="lg">
					{idx + 1 >= questions.length ? "See results" : "Next question"}
					<SubmitIcon size={16} strokeWidth={2} />
				</Button>
			</div>
		</div>
	);
}
