import { SideBar } from "@/ui/layout/sidebar";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen" style={{ background: "rgb(var(--bg))" }}>
			<nav id="sidenav">
				<SideBar />
			</nav>
			<main id="layout" className="min-h-screen">
				<div className="pl-16">{children}</div>
			</main>
		</div>
	);
}
