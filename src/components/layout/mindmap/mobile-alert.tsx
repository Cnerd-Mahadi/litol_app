import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, FC, SetStateAction } from "react";

interface MobileAlertProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MobileAlert: FC<MobileAlertProps> = ({ open, setOpen }) => {
	return (
		<AlertDialog open={open}>
			<AlertDialogContent className="px-3">
				<AlertDialogHeader>
					<AlertDialogTitle>Warning!</AlertDialogTitle>
					<AlertDialogDescription>
						Add edge on drop feature is not yet available on touch devices! Use
						Add New Node for that. Ignore the message if this is not a touch
						device. Thank you.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={() => {
							setOpen(!open);
						}}>
						Ok
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
