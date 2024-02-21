import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/utils";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Logo } from "../sidebar/logo";
import { NavItemMobile } from "./nav-item-mobile";

export const SheetSideBarContext = createContext<{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>
				<FaBars size={24} />
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-72 max-w-72">
				<SheetSideBarContext.Provider value={{ open, setOpen }}>
					<Logo className="text-4xl text-center pb-8" />
					<div className="px-3">
						<div id="nav-item" className="flex flex-col gap-3 pb-6">
							{navItems.map(({ name, route, Icon }) => {
								return (
									<NavItemMobile
										key={name}
										route={route}
										title={name}
										Icon={<Icon />}
									/>
								);
							})}
						</div>
					</div>
				</SheetSideBarContext.Provider>
			</SheetContent>
		</Sheet>
	);
};
