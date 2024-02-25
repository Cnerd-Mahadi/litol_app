"use client";

import { createMindMap } from "@/actions/mindmap";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { mindmapRawSchema } from "@/types";
import { mindmapFormSchema as formSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useReactFlow } from "reactflow";
import * as z from "zod";

export const MindmapCreateForm = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { getNodes, getEdges } = useReactFlow();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});
	const { isPending, mutate } = useMutation({
		mutationKey: ["mindmap/create"],
		mutationFn: async (values: z.infer<typeof mindmapRawSchema>) =>
			await createMindMap({
				...values,
			}),
		onSuccess: async (success) => {
			if (success) {
				toast({
					title: "Success!",
					description: "Mindmap created successfully!",
				});
				router.push("/mindmap");
			}
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const rest = {
			nodes: JSON.stringify(getNodes()),
			edges: JSON.stringify(getEdges()),
		};
		if (getNodes().length < 1) {
			toast({
				description: "Please add atleast one node!",
			});
			return;
		}
		mutate({
			...values,
			...rest,
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="bg-white absolute top-1 md:top-5 left-1/2 -translate-x-1/2 lg:-translate-x-1/2 border-2 border-slate-200 rounded-md px-3 py-2 hidden  md:flex flex-row gap-2 justify-between items-start w-full max-w-lg">
				<Button
					onClick={() => router.back()}
					variant="outline"
					size="icon"
					className="px-2">
					<ArrowRightIcon className="size-10" />
				</Button>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full">
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
				<Button
					className="px-6 origin-center flex flex-row gap-2 mx-auto"
					disabled={form.formState.isSubmitting || isPending}
					type="submit">
					{(form.formState.isSubmitting || isPending) && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Save
				</Button>
			</form>
		</Form>
	);
};
