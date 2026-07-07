import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddIcon } from "@/ui/shared/icons";
import Link from "next/link";

export function CreateSummaryButton() {
	return (
		<Link href="/summary/new" className={cn(buttonVariants(), "shrink-0")}>
			<AddIcon size={16} strokeWidth={2} />
			Create
		</Link>
	);
}
