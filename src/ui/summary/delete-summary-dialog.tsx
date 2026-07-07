"use client";

import { deleteSummary } from "@/actions/summary";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { SpinnerIcon } from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useSWRConfig } from "swr";

export function DeleteSummaryDialog({
	open,
	onOpenChange,
	id,
	title,
	onDeleted,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	id: string;
	title: string;
	onDeleted?: () => void;
}) {
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const { execute, isPending } = useAction(deleteSummary, {
		onSuccess: () => {
			mutate("summaries");
			mutate("dashboard");
			toast({ title: "Summary deleted" });
			onOpenChange(false);
			onDeleted?.();
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Delete summary</DialogTitle>
					<DialogDescription>
						“{title}” will be permanently deleted. This can’t be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => execute({ id })}
						disabled={isPending}>
						{isPending ? <SpinnerIcon size={16} className="animate-spin" /> : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
