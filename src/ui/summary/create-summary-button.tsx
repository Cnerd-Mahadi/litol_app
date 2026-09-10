"use client";

import { buttonVariants } from "@/components/ui/button";
import { useIsDemo } from "@/hooks/use-is-demo";
import { cn } from "@/lib/utils";
import { AddIcon } from "@/ui/shared/icons";
import Link from "next/link";

export function CreateSummaryButton() {
	const isDemo = useIsDemo();

	if (isDemo) {
		return (
			<Link href="/summary/new" className={cn(buttonVariants(), "shrink-0")}>
				<AddIcon size={16} strokeWidth={2} />
				Generate with AI
			</Link>
		);
	}

	return (
		<Link href="/summary/new" className={cn(buttonVariants(), "shrink-0")}>
			<AddIcon size={16} strokeWidth={2} />
			Create
		</Link>
	);
}
