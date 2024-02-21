"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createSummary } from "@/actions/summary";
import { Button } from "@/components/ui/button";
import Chips from "@/components/ui/chips";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadImage } from "@/components/ui/upload-image";
import { useToast } from "@/components/ui/use-toast";
import { summaryFormSchema as formSchema } from "@/types/forms";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChipsChangeEvent } from "primereact/chips";
import { useForm } from "react-hook-form";

export const SummaryForm = () => {
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			details: "",
			keywords: [],
			image: "",
		},
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["summary/create"],
		mutationFn: async (values: z.infer<typeof formSchema>) =>
			await createSummary(values),
		onSuccess: async (success) => {
			if (success) {
				form.reset();
				toast({
					title: "Success!",
					description: "Summary created successfully!",
				});
				router.refresh();
			}
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

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
					name="keywords"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Chips
									id={field.name}
									value={field.value}
									onChange={(e: ChipsChangeEvent) => field.onChange(e.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={() => (
						<FormItem>
							<FormControl>
								<UploadImage register={form.register("image")} />
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
									placeholder="Add details to your summary..."
									rows={4}
									{...field}
									className="shadow-none font-medium"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="px-8 origin-center flex flex-row gap-2 mx-auto"
					disabled={form.formState.isSubmitting || isPending}
					type="submit">
					{(form.formState.isSubmitting || isPending) && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Create Summary
				</Button>
			</form>
		</Form>
	);
};
