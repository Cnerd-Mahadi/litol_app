import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-provider";
import { useLogOut } from "@/hooks/logout-hook";
import { formatedName } from "@/utils";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";

export const DropdownMobile = () => {
	const { handleLogOut, loading } = useLogOut();
	const user = useUser();
	const name = formatedName(user.name);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
					src={user.image}
					width={200}
					height={200}
					alt="user-pic"
					className="rounded-full size-8"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<h3 className="pb-2 font-semibold text-cyan-700">Welcome</h3>
					<p className="font-semibold text-slate-500">{name}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="py-0">
					<Button
						variant="ghost"
						onClick={handleLogOut}
						disabled={loading}
						className="gap-3 w-full text-slate-500 hover:text-blue-500">
						<MdOutlineLogout size={20} />
						<p>Log Out</p>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
