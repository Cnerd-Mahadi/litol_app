"use client";

import { deleteNote } from "@/actions/note";
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

export function DeleteNoteDialog({
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
	const { execute, isPending } = useAction(deleteNote, {
		onSuccess: () => {
			mutate("notes");
			mutate("dashboard");
			toast({ title: "Note deleted" });
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
					<DialogTitle>Delete note</DialogTitle>
					<DialogDescription>
						“{title}” and its cues will be permanently deleted. This can’t be
						undone.
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
