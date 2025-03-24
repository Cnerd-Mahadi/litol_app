"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-provider";
import { useLogOut } from "@/hooks/logout-hook";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";

export const LogOutSidebar = () => {
	const { handleLogOut, loading } = useLogOut();
	const user = useUser();

	return (
		<Button
			onClick={handleLogOut}
			disabled={loading}
			className="flex flex-row justify-start items-center gap-4 bg-blue-50 hover:bg-blue-50 p-2 py-3 pl-4 rounded-md w-full font-semibold text-slate-500 hover:text-blue-500 text-sm">
			<Image
				src={user.image}
				width={300}
				height={300}
				alt="user-pic"
				className="rounded-full w-6"
			/>
			<div className="flex flex-row items-center gap-1">
				<MdOutlineLogout size={18} />
				<p className="font-semibold text-sm">Log Out</p>
			</div>
		</Button>
	);
};
