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
import { signOut } from "@/lib/firebase/client";
import { formatedName } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";

export const DropdownMobile = () => {
	const router = useRouter();
	const user = useUser();
	const name = formatedName(user.name);

	const handleLogOut = async () => {
		const isOk = await signOut();
		if (isOk) router.push("/signin");
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
					src={user.image}
					width={200}
					height={200}
					alt="user-pic"
					className="size-8 rounded-full"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<h3 className="text-cyan-700 font-semibold pb-2">Welcome</h3>
					<p className="text-slate-500 font-semibold">{name}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="py-0">
					<Button
						variant="ghost"
						onClick={handleLogOut}
						className=" text-slate-500 hover:text-blue-500 w-full gap-3">
						<MdOutlineLogout size={20} />
						<p>Log Out</p>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
