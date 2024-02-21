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
import { useMindMap } from "@/hooks/mindmap-hook";
import { ResponseType, mindmapRawSchema } from "@/types";
import { mindmapFormUpdateSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useReactFlow } from "reactflow";
import * as z from "zod";
import { useMindMapSideBar } from "./mindmap-sidebar";

export const MindmapUpdateMobile = ({
	title,
	id,
}: {
	title: string;
	id: string;
}) => {
	const { handleAddNode, handleClearCanvas } = useMindMap();
	const { setOpen } = useMindMapSideBar();
	const router = useRouter();
	const [editable, setEditable] = useState(false);
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
				className="py-6 pt-8 flex flex-col gap-4">
				<div className="flex flex-row justify-between items-start gap-2">
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
						variant="outline"
						pressed={editable}
						onPressedChange={() => setEditable(!editable)}>
						<Pencil1Icon className="size-4" />
					</Toggle>
				</div>
				<Button
					className="px-6 origin-center flex flex-row gap-2 bg-green-500 hover:bg-green-600"
					disabled={form.formState.isSubmitting || isPending}
					type="submit">
					{(form.formState.isSubmitting || isPending) && (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					)}
					Update
				</Button>
				<div className="space-y-6 mt-10 w-full">
					<Button
						variant="outline"
						type="button"
						onClick={() => {
							setOpen(false);
							handleAddNode();
						}}
						className="px-6 origin-center flex flex-row w-full gap-2">
						<PlusIcon className="w-4" />
						Add New Node
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setOpen(false);
							handleClearCanvas();
						}}
						className="px-6 origin-center flex flex-row w-full gap-2">
						<MdDelete className="w-4 text-slate-600" />
						Clear Canvas
					</Button>
				</div>
			</form>
		</Form>
	);
};
