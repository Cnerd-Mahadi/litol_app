"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSubjects } from "@/lib/swr/use-subjects";

interface SubjectSelectorProps {
	value: string;
	onChange: (id: string) => void;
	placeholder?: string;
}

export function SubjectSelector({
	value,
	onChange,
	placeholder = "Select subject",
}: SubjectSelectorProps) {
	const { data, isLoading } = useSubjects();
	const subjects = data?.subjects ?? [];

	return (
		<Select
			value={value || undefined}
			onValueChange={onChange}
			disabled={isLoading}>
			<SelectTrigger className="w-full flex-1">
				<SelectValue placeholder={isLoading ? "Loading" : placeholder} />
			</SelectTrigger>
			<SelectContent>
				{subjects.map((s) => (
					<SelectItem key={s.id} value={s.id}>
						{s.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
