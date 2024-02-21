"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-provider";
import { signOut } from "@/lib/firebase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";

export const LogOut = () => {
	const router = useRouter();
	const user = useUser();

	const handleLogOut = async () => {
		const isOk = await signOut();
		if (isOk) router.push("/signin");
	};
	return (
		<Button
			onClick={handleLogOut}
			className="flex flex-row items-center justify-start p-2 py-3 pl-4 gap-4 rounded-md bg-blue-50 text-sm font-semibold text-slate-500 hover:text-blue-500 hover:bg-blue-50 w-full">
			<Image
				src={user.image}
				width={300}
				height={300}
				alt="user-pic"
				className="w-6 rounded-full"
			/>
			<div className="flex flex-row items-center gap-1">
				<MdOutlineLogout size={18} />
				<p className="text-sm font-semibold">Log Out</p>
			</div>
		</Button>
	);
};
