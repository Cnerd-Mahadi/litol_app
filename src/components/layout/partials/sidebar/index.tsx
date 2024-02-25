import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from "@/utils";
import { Logo } from "./logo";
import { LogOut } from "./logout";
import { NavItem } from "./nav-item";

export const SideBar = () => {
	return (
		<ScrollArea className="w-52 pt-8 h-screen">
			<Logo className="text-4xl text-center pb-8" />
			<div className="px-6">
				<div id="nav-item" className="flex flex-col gap-2 pb-6">
					{navItems.map(({ name, route, Icon }) => {
						return (
							<NavItem key={name} route={route} title={name} Icon={Icon} />
						);
					})}
				</div>
				<div className="pt-24 pb-16">
					<LogOut />
				</div>
			</div>
		</ScrollArea>
	);
};
