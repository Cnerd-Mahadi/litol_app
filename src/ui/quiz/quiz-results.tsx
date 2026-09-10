"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddIcon, CheckIcon, CloseIcon, RetryIcon } from "@/ui/shared/icons";
import { useEffect, useState } from "react";
import type { QuizQuestion } from "./quiz-answering";

export function QuizResults({
	label,
	questions,
	answers,
	onRetry,
	onNew,
}: {
	label: string;
	questions: QuizQuestion[];
	answers: Record<number, number>;
	onRetry: () => void;
	onNew: () => void;
}) {
	const correct = questions.filter((q, i) => q.options[answers[i]] === q.answer).length;
	const pct = Math.round((correct / questions.length) * 100);
	const [dash, setDash] = useState(0);
	const verdict =
		pct >= 80 ? "Excellent recall" : pct >= 60 ? "Solid. Review the misses" : "Worth another pass";
	const R = 52;
	const C = 2 * Math.PI * R;

	useEffect(() => {
		const t = setTimeout(() => setDash(pct), 200);
		return () => clearTimeout(t);
	}, [pct]);

	return (
		<div className="mx-auto max-w-2xl animate-fade-up">
			<Card className="p-6 text-center sm:p-8">
				<div className="text-caption text-muted-foreground">Quiz complete · {label}</div>
				<div className="relative mx-auto mt-5 size-32">
					<svg viewBox="0 0 120 120" className="size-32 -rotate-90">
						<circle cx="60" cy="60" r={R} fill="none" stroke="var(--border-strong)" strokeWidth="9" />
						<circle
							cx="60"
							cy="60"
							r={R}
							fill="none"
							stroke="var(--primary)"
							strokeWidth="9"
							strokeLinecap="round"
							strokeDasharray={C}
							strokeDashoffset={C - (C * dash) / 100}
							style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,0,0,1)" }}
						/>
					</svg>
					<div className="absolute inset-0 grid place-items-center">
						<div>
							<div className="text-display font-semibold leading-none tabular-nums text-foreground">
								{correct}
								<span className="text-title text-foreground-faint">/{questions.length}</span>
							</div>
							<div className="mt-1 text-caption tabular-nums text-muted-foreground">{pct}%</div>
						</div>
					</div>
				</div>
				<div className="mt-5 text-title font-semibold text-foreground">{verdict}</div>
				<div className="mt-6 flex justify-center gap-2">
					<Button variant="outline" onClick={onRetry}>
						<RetryIcon size={15} strokeWidth={1.5} />
						Retry quiz
					</Button>
					<Button onClick={onNew}>
						<AddIcon size={15} strokeWidth={2} />
						New quiz
					</Button>
				</div>
			</Card>

			<div className="mt-8">
				<div className="mb-3 flex h-6 items-center justify-between">
					<h2 className="text-ui font-medium text-foreground">Breakdown</h2>
					<span className="text-caption tabular-nums text-muted-foreground">
						{correct} of {questions.length} correct
					</span>
				</div>
				<Card className="divide-y divide-border overflow-hidden">
					{questions.map((q, i) => {
						const ok = q.options[answers[i]] === q.answer;
						return (
							<div key={i} className="flex items-start gap-3 px-4 py-3">
								<span
									className={cn(
										"mt-0.5 grid size-6 shrink-0 place-items-center rounded-md",
										ok ? "bg-success-bg text-success-text" : "bg-danger-bg text-danger-text",
									)}>
									{ok ? (
										<CheckIcon size={13} strokeWidth={2.5} />
									) : (
										<CloseIcon size={12} strokeWidth={2.5} />
									)}
								</span>
								<div className="min-w-0 flex-1">
									<div className="text-ui font-medium text-foreground">{q.question}</div>
									<div className="mt-0.5 text-caption text-muted-foreground">
										Answer: <span className="text-success-text">{q.answer}</span>
										{!ok && answers[i] != null && (
											<span className="text-danger-text"> · You picked {q.options[answers[i]]}</span>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</Card>
			</div>
		</div>
	);
}
