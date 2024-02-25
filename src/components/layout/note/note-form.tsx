"use client";

import { createNote } from "@/actions/note";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { noteFormSchema as formSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const createNewCue = () => {
	return { id: `cue_${uuidv4()}`, key: "", details: "" };
};

export const NoteForm = () => {
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			details: "",
			cues: [createNewCue()],
		},
	});
	const {
		append: appendCue,
		remove: removeCue,
		fields: cues,
	} = useFieldArray({
		name: "cues",
		control: form.control,
	});

	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationKey: ["note/create"],
		mutationFn: async (values: z.infer<typeof formSchema>) =>
			await createNote(values),
		onSuccess: async (success) => {
			if (success) {
				form.reset();
				toast({
					title: "Success!",
					description: "Note created successfully!",
				});
				router.refresh();
			}
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

	const handleAddNewCue = () => {
		appendCue(createNewCue());
	};

	const handleRemoveCue = (index: number) => {
		removeCue(index);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Give a title.."
									{...field}
									className="shadow-none border-slate-300 font-medium"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="details"
					render={({ field }) => (
						<FormItem className="mb-16">
							<FormControl>
								<Textarea
									placeholder="Add details to your note..."
									rows={4}
									{...field}
									className="shadow-none font-medium"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="px-2 py-4 rounded-md">
					<div className="flex flex-row justify-between items-center pb-4 px-2">
						<p className="text-slate-800 text-lg font-bold">Cue Section</p>
						<Button
							type="button"
							onClick={handleAddNewCue}
							className="bg-slate-900 hover:bg-slate-800">
							New Cue
						</Button>
					</div>
					<div className="flex flex-col gap-4">
						{cues.map((item, index) => (
							<div key={item.id} className="flex md:flex-row gap-3 flex-col">
								<FormField
									control={form.control}
									name={`cues.${index}.key`}
									render={({ field }) => (
										<FormItem className="w-full md:max-w-48">
											<FormControl>
												<Input
													placeholder="Give a key.."
													{...field}
													className="shadow-none border-slate-300 bg-white font-medium"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`cues.${index}.details`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<Input
													placeholder="Add details.."
													{...field}
													className="shadow-none border-slate-300 bg-white font-medium"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<TrashIcon
									onClick={() => handleRemoveCue(index)}
									className="size-6 md:size-10 text-slate-600 hover:text-red-500 cursor-pointer"
								/>
							</div>
						))}
					</div>
				</div>
				<Button
					className="px-8 origin-center flex flex-row gap-2 mx-auto"
					disabled={form.formState.isSubmitting || isPending}
					type="submit">
					{(form.formState.isSubmitting || isPending) && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Create Note
				</Button>
			</form>
		</Form>
	);
};
