"use client";

import { createSubject } from "@/actions/user";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useSubjects } from "@/lib/swr/use-subjects";
import { cn } from "@/lib/utils";
import { hueDot, hueFor } from "@/ui/shared/icon-chip";
import { AddIcon, CheckIcon, ChevronDownIcon, ManageIcon } from "@/ui/shared/icons";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { SubjectsManageModal } from "./subjects-manage-modal";

interface SubjectSelectorProps {
	value: string;
	onChange: (id: string) => void;
	placeholder?: string;
	className?: string;
	/** Show the "Manage subjects" entry (rename/delete). Off by
	 * default in pure-selection contexts like quiz, where managing
	 * subjects isn't part of the task. */
	manageable?: boolean;
}

export function SubjectSelector({
	value,
	onChange,
	placeholder = "Select subject",
	className,
	manageable = true,
}: SubjectSelectorProps) {
	const { data, isLoading } = useSubjects();
	const { mutate } = useSWRConfig();
	const { toast } = useToast();
	const subjects = data?.subjects ?? [];
	const selected = subjects.find((s) => s.id === value);
	const [open, setOpen] = useState(false);
	const [manageOpen, setManageOpen] = useState(false);
	const [search, setSearch] = useState("");

	const create = useAction(createSubject, {
		onSuccess: ({ data }) => {
			mutate("subjects");
			if (data?.subjectId) onChange(data.subjectId);
			setSearch("");
			setOpen(false);
		},
		onError: ({ error: e }) =>
			toast({ title: e.serverError, variant: "destructive" }),
	});

	const term = search.trim().toLowerCase();
	const filtered = term
		? subjects.filter((s) => s.name.toLowerCase().includes(term))
		: subjects;

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button
						type="button"
						role="combobox"
						aria-expanded={open}
						disabled={isLoading}
						className={cn(
							"flex h-8 w-full items-center justify-between gap-1.5 text-sm text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
							!selected && "text-foreground-faint",
							className,
						)}>
						<span className="flex min-w-0 items-center gap-2 truncate">
							{selected && (
								<span
									className={cn(
										"size-1.5 shrink-0 rounded-full",
										hueDot(hueFor(selected.name)),
									)}
								/>
							)}
							<span className="truncate">
								{isLoading ? "Loading" : (selected?.name ?? placeholder)}
							</span>
						</span>
						<ChevronDownIcon size={14} strokeWidth={1.75} className="shrink-0 opacity-50" />
					</button>
				</PopoverTrigger>
				<PopoverContent
					align="start"
					className="w-(--radix-popover-trigger-width) p-0">
					<Command shouldFilter={false}>
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder="Search or type to create…"
						/>
						<CommandList>
							{filtered.length === 0 && !term && (
								<CommandEmpty>No subjects yet.</CommandEmpty>
							)}
							{filtered.length > 0 && (
								<CommandGroup heading="Subjects">
									{filtered.map((s) => (
										<CommandItem
											key={s.id}
											value={s.id}
											onSelect={() => {
												onChange(s.id);
												setOpen(false);
											}}>
											<span
												className={cn(
													"size-1.5 shrink-0 rounded-full",
													hueDot(hueFor(s.name)),
												)}
											/>
											<span className="flex-1 truncate">{s.name}</span>
											{s.id === value && <CheckIcon size={14} strokeWidth={2} />}
										</CommandItem>
									))}
								</CommandGroup>
							)}
							{term && filtered.length === 0 && (
								<CommandGroup>
									<CommandItem
										value={`create-${term}`}
										onSelect={() => create.execute({ name: search.trim() })}
										disabled={create.isPending}
										className="cursor-pointer">
										<AddIcon size={14} strokeWidth={1.75} />
										Create “{search.trim()}”
									</CommandItem>
								</CommandGroup>
							)}
						</CommandList>
						{manageable && (
							<div className="border-t border-border p-1">
								<button
									type="button"
									onClick={() => {
										setOpen(false);
										setManageOpen(true);
									}}
									className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
									<ManageIcon size={14} strokeWidth={1.5} aria-hidden />
									Manage subjects
								</button>
							</div>
						)}
					</Command>
				</PopoverContent>
			</Popover>
			{manageable && (
				<SubjectsManageModal open={manageOpen} onOpenChange={setManageOpen} />
			)}
		</>
	);
}
