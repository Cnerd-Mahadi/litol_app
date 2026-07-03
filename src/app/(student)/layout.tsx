import { MobileNav } from "@/ui/layout/mobile-nav";
import { MobileTopbar } from "@/ui/layout/mobile-topbar";
import { SideBar } from "@/ui/layout/sidebar";

export default async function StudentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen overflow-x-hidden">
			<SideBar />
			<MobileTopbar />
			<main className="min-h-screen pb-[calc(56px+env(safe-area-inset-bottom))] lg:pb-0 lg:pl-16">
				{children}
			</main>
			<MobileNav />
		</div>
	);
}
