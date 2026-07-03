import { hueChip, hueFor, IconChip } from "@/ui/shared/icon-chip";
import { fmtDate } from "@/lib/time";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export type SummaryItem = {
	id: string;
	title: string;
	description: string | null;
	keywords: string[];
	content: string;
	subjectId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export function SummaryReader({ s }: { s: SummaryItem }) {
	return (
		<div className="mx-auto max-w-[720px] animate-fade-up">
			<Link
				href="/summary"
				className="mb-5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-muted-foreground transition-colors hover:text-foreground">
				<ChevronRight size={15} strokeWidth={1.5} className="rotate-180" aria-hidden />
				Back to gallery
			</Link>

			<div className="overflow-hidden rounded-lg border border-border bg-card shadow-(--shadow-card)">
				<div className="border-b border-border p-5 sm:p-7">
					<div className="mb-4 flex items-center gap-2.5">
						<IconChip Icon={Sparkles} color="violet" size={36} />
						<span className="text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
							Summary
						</span>
					</div>
					<div className="text-[11px] tabular-nums text-foreground-faint">
						{fmtDate(s.createdAt)}
					</div>
					<h1 className="mt-2 text-[20px] font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-[24px]">
						{s.title}
					</h1>

					{s.keywords.length > 0 && (
						<div className="mt-5">
							<div className="mb-2.5 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
								Key terms
							</div>
							<div className="flex flex-wrap gap-2">
								{s.keywords.map((k) => (
									<span
										key={k}
										className={`inline-flex h-7 items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-medium ${hueChip(
											hueFor(k),
										)}`}>
										{k}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="p-5 sm:p-7">
					<div className="mb-4 text-[11px] uppercase tracking-[0.04em] text-foreground-faint">
						Summary
					</div>
					<p className="whitespace-pre-wrap text-[15px] leading-[1.85] text-foreground">
						{s.content}
					</p>
				</div>
			</div>
		</div>
	);
}
