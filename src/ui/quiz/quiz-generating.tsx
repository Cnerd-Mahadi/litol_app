"use client";

import { GeneratingPanel } from "@/ui/shared/generating-panel";
import { GraduationCap } from "lucide-react";

const STEPS = [
	"Analyzing notes",
	"Drafting questions",
	"Writing distractors",
	"Finalizing quiz",
];

export function QuizGenerating({ label }: { label: string }) {
	return (
		<GeneratingPanel
			Icon={GraduationCap}
			color="indigo"
			heading="Building your quiz"
			subtitle={
				<>
					on <span className="text-foreground">{label}</span>
				</>
			}
			steps={STEPS}
			dwell={[1600, 2800, 3200]}
		/>
	);
}
