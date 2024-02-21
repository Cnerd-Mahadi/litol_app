import { feynmanResolve } from "@/actions/feynman";
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
import { feynmanSchema } from "@/types";
import { feynmanFormSchema as formSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const FeynmanForm = ({
	item,
	setVisible,
}: {
	item: z.infer<typeof feynmanSchema>;
	setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			meeting_link: "",
			schedule: null,
		},
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["feynman/resolve"],
		mutationFn: async (values: z.infer<typeof formSchema>) =>
			await feynmanResolve(values, item),
		onSuccess: async (data) => {
			if (data.success) {
				setVisible(false);
				toast({
					title: "Success!",
					description: "Feynman invitation sent successfully!",
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
					name="meeting_link"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Provide the meeting link"
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
					name="schedule"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Calendar
									inputId={field.name}
									value={field.value}
									placeholder="Schedule a time"
									onChange={field.onChange}
									minDate={new Date()}
									showTime
									hourFormat="12"
									pt={{
										root: {
											className: classNames("flex w-full focus:border-none"),
										},
										input: {
											root: {
												className: classNames("text-sm font-medium py-2"),
											},
										},
									}}
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
					Invite
				</Button>
			</form>
		</Form>
	);
};
