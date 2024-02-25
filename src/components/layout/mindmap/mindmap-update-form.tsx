"use client";

import { updateMindMap } from "@/actions/mindmap";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { ResponseType, mindmapRawSchema } from "@/types";
import { mindmapFormUpdateSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Pencil1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useReactFlow } from "reactflow";
import * as z from "zod";

export const MindmapUpdateForm = ({
	title,
	id,
}: {
	title: string;
	id: string;
}) => {
	const [editable, setEditable] = useState(false);
	const router = useRouter();
	const { toast } = useToast();
	const formSchema = mindmapFormUpdateSchema(id);
	const { getNodes, getEdges } = useReactFlow();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: title,
		},
	});
	const { isPending, mutate } = useMutation({
		mutationKey: ["mindmap/update"],
		mutationFn: async (values: z.infer<typeof mindmapRawSchema>) =>
			await updateMindMap(
				{
					...values,
				},
				id
			),
		onSuccess: async (response) => {
			const data: ResponseType = await response.json();
			if (data.success) {
				toast({
					title: "Success!",
					description: "Mindmap updated successfully!",
				});
				router.push("/mindmap");
				// revalidatePath("/mindmap/id/[mindmapId]", "page");
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
					type="button"
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
									disabled={!editable}
									placeholder="Give a title.."
									{...field}
									className="shadow-none border-slate-300 disabled:bg-slate-100"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Toggle
					type="button"
					variant="outline"
					pressed={editable}
					onPressedChange={() => setEditable(!editable)}>
					<Pencil1Icon className="size-4" />
				</Toggle>
				<Button
					className="px-6 origin-center hidden md:flex flex-row gap-2 mx-auto bg-green-500 hover:bg-green-600"
					disabled={form.formState.isSubmitting || isPending}
					type="submit">
					{(form.formState.isSubmitting || isPending) && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Update
				</Button>
			</form>
		</Form>
	);
};
