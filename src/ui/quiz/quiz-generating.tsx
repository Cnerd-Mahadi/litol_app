"use client";

import { GeneratingPanel } from "@/ui/shared/generating-panel";
import { QuizIcon } from "@/ui/shared/icons";

const STEPS = [
	"Analyzing notes",
	"Drafting questions",
	"Writing distractors",
	"Finalizing quiz",
];

export function QuizGenerating({ label }: { label: string }) {
	return (
		<GeneratingPanel
			Icon={QuizIcon}
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
