import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from "@/utils";
import { Logo } from "./logo";
import { LogOutSidebar } from "./logout-sidebar";
import { NavItem } from "./nav-item";

export const SideBar = () => {
	return (
		<ScrollArea className="pt-8 w-52 h-screen">
			<Logo className="pb-8 text-4xl text-center" />
			<div className="px-6">
				<div id="nav-item" className="flex flex-col gap-2 pb-6">
					{navItems.map(({ name, route, Icon }) => {
						return (
							<NavItem key={name} route={route} title={name} Icon={Icon} />
						);
					})}
				</div>
				<div className="pt-24 pb-16">
					<LogOutSidebar />
				</div>
			</div>
		</ScrollArea>
	);
};
