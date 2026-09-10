import { DemoBanner } from "@/ui/layout/demo-banner";
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
			<main className="min-h-screen pb-[calc(56px+env(safe-area-inset-bottom))] transition-[padding] duration-300 ease-[cubic-bezier(.2,0,0,1)] lg:pb-0 lg:pl-(--sidebar-w)">
				<DemoBanner />
				{children}
			</main>
			<MobileNav />
		</div>
	);
}
