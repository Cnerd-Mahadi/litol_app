"use client";

import { deleteSubject, updateSubject } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
} from "@/ui/shared/modal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSubjects } from "@/lib/swr/use-subjects";
import type { SubjectItem } from "@/lib/swr/use-subjects";
import { cn } from "@/lib/utils";
import { hueChip, hueDot, hueFor } from "@/ui/shared/icon-chip";
import {
	CheckIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
	SpinnerIcon,
	SubjectIcon,
	WarningIcon,
} from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useSWRConfig } from "swr";

function SubjectRow({ subject }: { subject: SubjectItem }) {
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(subject.name);
	const [confirming, setConfirming] = useState(false);

	const rename = useAction(updateSubject, {
		onSuccess: () => {
			mutate("subjects");
			toast({ title: "Subject renamed" });
			setEditing(false);
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const remove = useAction(deleteSubject, {
		onSuccess: () => {
			mutate("subjects");
			mutate("notes");
			mutate("dashboard");
			toast({ title: "Subject deleted" });
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const save = () => {
		const trimmed = name.trim();
		if (!trimmed || trimmed === subject.name) {
			setEditing(false);
			setName(subject.name);
			return;
		}
		rename.execute({ id: subject.id, name: trimmed });
	};

	if (confirming) {
		return (
			<div className="rounded-lg border border-border-strong p-4">
				<div className="flex items-start gap-3">
					<WarningIcon
						size={18}
						strokeWidth={2}
						className="mt-0.5 shrink-0 text-danger-text"
					/>
					<div className="min-w-0 flex-1">
						<p className="text-[14px] font-semibold text-foreground">
							Delete “{subject.name}”?
						</p>
						<p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
							All its notes and cues will be permanently deleted. This can’t
							be undone.
						</p>
					</div>
				</div>
				<div className="mt-3.5 flex justify-end gap-2">
					<Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
						Cancel
					</Button>
					<Button
						size="sm"
						variant="destructive"
						onClick={() => remove.execute({ id: subject.id })}
						disabled={remove.isPending}>
						{remove.isPending ? (
							<SpinnerIcon size={14} className="animate-spin" />
						) : (
							"Delete"
						)}
					</Button>
				</div>
			</div>
		);
	}

	if (editing) {
		return (
			<div className="flex items-center gap-2">
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && save()}
					className="h-9 flex-1"
					autoFocus
				/>
				<Button
					size="icon-sm"
					aria-label="Save name"
					onClick={save}
					disabled={rename.isPending}>
					{rename.isPending ? (
						<SpinnerIcon size={14} className="animate-spin" />
					) : (
						<CheckIcon size={15} strokeWidth={2} />
					)}
				</Button>
				<Button
					size="icon-sm"
					variant="ghost"
					aria-label="Cancel"
					onClick={() => {
						setEditing(false);
						setName(subject.name);
					}}>
					<CloseIcon size={15} strokeWidth={2} />
				</Button>
			</div>
		);
	}

	return (
		<div className="group flex items-center gap-3">
			<span
				className={cn("size-2 shrink-0 rounded-full", hueDot(hueFor(subject.name)))}
			/>
			<p className="min-w-0 flex-1 truncate text-[14px] font-medium text-foreground">
				{subject.name}
			</p>
			<button
				type="button"
				aria-label={`Rename ${subject.name}`}
				onClick={() => setEditing(true)}
				className="grid size-7 shrink-0 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
				<EditIcon size={14} strokeWidth={1.5} />
			</button>
			<button
				type="button"
				aria-label={`Delete ${subject.name}`}
				onClick={() => setConfirming(true)}
				className="grid size-7 shrink-0 place-items-center rounded-md text-foreground-faint opacity-0 transition hover:bg-danger-bg hover:text-danger-text focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100 max-lg:opacity-100">
				<DeleteIcon size={14} strokeWidth={1.5} />
			</button>
		</div>
	);
}

export function SubjectsManageModal({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const { data, isLoading } = useSubjects();
	const subjects = data?.subjects ?? [];

	return (
		<Modal open={open} onOpenChange={onOpenChange}>
			<ModalContent className="flex max-h-[85vh] min-h-100 flex-col gap-0 overflow-hidden p-0 sm:max-w-md">
				<ModalHeader className="shrink-0 px-4 pt-4 pb-4 text-left sm:px-6 sm:pt-6 sm:pb-5">
					<div className="flex items-center gap-3 sm:gap-3.5">
						<span
							className={cn(
								"grid size-9 shrink-0 place-items-center rounded-md sm:size-11",
								hueChip("blue"),
							)}>
							<SubjectIcon size={18} strokeWidth={1.75} aria-hidden />
						</span>
						<div>
							<ModalTitle className="text-[16px] font-semibold sm:text-[19px]">
								Manage subjects
							</ModalTitle>
							<p className="mt-0.5 text-[12.5px] text-muted-foreground sm:text-[13.5px]">
								Rename or remove subjects. New subjects are created from the
								subject picker.
							</p>
						</div>
					</div>
				</ModalHeader>
				<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
					<div>
						{isLoading ? (
							<div className="flex justify-center py-8">
								<SpinnerIcon className="animate-spin text-muted-foreground" />
							</div>
						) : subjects.length === 0 ? (
							<p className="py-8 text-center text-[13px] text-muted-foreground">
								No subjects yet.
							</p>
						) : (
							<div className="divide-y divide-border">
								{subjects.map((s) => (
									<div key={s.id} className="py-2.5 first:pt-0 last:pb-0">
										<SubjectRow subject={s} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
}
