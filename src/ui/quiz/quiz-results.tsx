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
	const correct = questions.filter(
		(q, i) => q.options[answers[i]] === q.answer,
	).length;
	const pct = Math.round((correct / questions.length) * 100);
	const [dash, setDash] = useState(0);
	const verdict =
		pct >= 80
			? "Excellent recall"
			: pct >= 60
				? "Solid. Review the misses"
				: "Worth another pass";
	const R = 52;
	const C = 2 * Math.PI * R;

	useEffect(() => {
		const t = setTimeout(() => setDash(pct), 200);
		return () => clearTimeout(t);
	}, [pct]);

	return (
		<div className="mx-auto max-w-2xl animate-fade-up">
			<Card className="p-6 text-center shadow-(--shadow-card) sm:p-8">
				<div className="text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
					Quiz complete · {label}
				</div>
				<div className="relative mx-auto mt-5 size-32">
					<svg viewBox="0 0 120 120" className="size-32 -rotate-90">
						<circle
							cx="60"
							cy="60"
							r={R}
							fill="none"
							stroke="var(--border)"
							strokeWidth="9"
						/>
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
							style={{
								transition: "stroke-dashoffset 1.1s cubic-bezier(.2,0,0,1)",
							}}
						/>
					</svg>
					<div className="absolute inset-0 grid place-items-center">
						<div>
							<div className="text-[26px] font-semibold leading-none tabular-nums text-foreground sm:text-[30px]">
								{correct}
								<span className="text-[18px] text-foreground-faint sm:text-[20px]">
									/{questions.length}
								</span>
							</div>
							<div className="mt-1 text-[12px] tabular-nums text-link">
								{pct}%
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 text-[18px] font-medium text-foreground">
					{verdict}
				</div>
				<div className="mt-6 flex justify-center gap-3">
					<Button variant="secondary" onClick={onRetry}>
						<RetryIcon size={15} strokeWidth={1.5} />
						Retry quiz
					</Button>
					<Button onClick={onNew}>
						<AddIcon size={15} strokeWidth={2} />
						New quiz
					</Button>
				</div>
			</Card>

			<div className="mt-5 space-y-2.5">
				<div className="mb-1 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
					Breakdown
				</div>
				{questions.map((q, i) => {
					const ok = q.options[answers[i]] === q.answer;
					return (
						<Card
							key={i}
							className="flex items-start gap-3 p-4 shadow-(--shadow-card)">
							<span
								className={cn(
									"mt-0.5 grid size-6 shrink-0 place-items-center rounded-md",
									ok
										? "bg-success-bg text-success-text"
										: "bg-danger-bg text-danger-text",
								)}>
								{ok ? (
									<CheckIcon size={13} strokeWidth={2.5} />
								) : (
									<CloseIcon size={12} strokeWidth={2.5} />
								)}
							</span>
							<div className="min-w-0 flex-1">
								<div className="text-[13.5px] font-medium text-foreground">
									{q.question}
								</div>
								<div className="mt-1 text-[12.5px] text-muted-foreground">
									Answer:{" "}
									<span className="text-success-text">{q.answer}</span>
									{!ok && answers[i] != null && (
										<span className="text-danger-text">
											{" "}
											· You picked {q.options[answers[i]]}
										</span>
									)}
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
