import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Dispatch, FC, SetStateAction } from "react";

interface DeleteButtonProps {
	className?: string;
	loading: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	handleDelete?: (id: any) => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
	className,
	loading,
	handleDelete,
	open,
	setOpen,
}) => {
	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger asChild onClick={() => setOpen(true)}>
				<TrashIcon
					className={cn(
						"size-8 absolute bg-white text-slate-600 hover:text-red-500 cursor-pointer z-50 p-1 rounded-md border border-slate-300",
						className
					)}
				/>
			</AlertDialogTrigger>
			<AlertDialogContent className="px-3">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This content will be deleted once clicked on continue. Are you sure
						you want to delete this?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction disabled={loading} onClick={handleDelete}>
						{loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
