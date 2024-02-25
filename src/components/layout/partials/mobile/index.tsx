import { DropdownMobile } from "./dropdown-mobile";
import { Sidebar } from "./sidebar";

export const Topbar = () => {
	return (
		<div className="px-8 py-4 flex flex-row justify-between items-center lg:hidden">
			<Sidebar />
			<div className="flex flex-row justify-center items-center gap-2">
				<DropdownMobile />
			</div>
		</div>
	);
};
