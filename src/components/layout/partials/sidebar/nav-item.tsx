import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

export interface NavItemProps {
	route: string;
	title: string;
	Icon: IconType;
}

export const NavItem = ({ route, title, Icon }: NavItemProps) => {
	const path = usePathname();
	const isActive =
		(path.startsWith(route) && route !== "/") ||
		(route === "/" && path === "/");
	return (
		<Link
			href={route}
			className="flex flex-row items-center gap-5 py-2 pl-3 rounded-md group hover:bg-blue-50">
			<Icon
				className={`
					${isActive ? "text-blue-500" : "text-slate-500"} group-hover:text-blue-500`}
			/>
			<p
				className={`font-semibold text-sm ${
					isActive ? "text-blue-500" : "text-slate-600"
				} group-hover:text-blue-500`}>
				{title}
			</p>
		</Link>
	);
};
