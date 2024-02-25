"use client";

import { checkRequest, feynmanRequest } from "@/actions/learn";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ResponseType, userSchema } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

interface FeynmanButtonProps {
	id: string;
	user: z.infer<typeof userSchema>;
}

export const FeynmanButton = ({ id, user }: FeynmanButtonProps) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["feynman/checkRequest"],
		queryFn: async () => {
			return await checkRequest(id, user.id);
		},
	});
	const { isPending, mutate } = useMutation({
		mutationKey: ["feynman/request"],
		mutationFn: async () => {
			return await feynmanRequest(id, user);
		},
		onSuccess: async (response) => {
			const data: ResponseType = await response.json();
			toast({
				title: "Success!",
				description: data.message,
			});
			queryClient.invalidateQueries({
				queryKey: ["feynman/checkRequest"],
			});
		},
	});
	const handleRequest = () => {
		mutate();
	};
	return (
		<Button
			onClick={handleRequest}
			variant="outline"
			size="lg"
			disabled={isLoading || isPending || !data}
			className="text-blue-500 hover:text-blue-500 border rounded-full border-blue-500 text-base px-10">
			{(isPending || isLoading) && (
				<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			)}
			Feynman Request
		</Button>
	);
};
