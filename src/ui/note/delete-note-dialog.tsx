"use client";

import { deleteNote } from "@/actions/note";
import { Button } from "@/components/ui/button";
import {
	Modal,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "@/ui/shared/modal";
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
		<Modal open={open} onOpenChange={onOpenChange}>
			<ModalContent className="sm:max-w-md">
				<ModalHeader>
					<ModalTitle>Delete note</ModalTitle>
					<ModalDescription>
						“{title}” and its cues will be permanently deleted. This can’t be
						undone.
					</ModalDescription>
				</ModalHeader>
				<ModalFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={() => execute({ id })}
						disabled={isPending}>
						{isPending ? <SpinnerIcon size={16} className="animate-spin" /> : "Delete"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
