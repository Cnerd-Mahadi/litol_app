import { LayoutWrapper } from "@/components/layout/partials/layout-wrapper";
import { WrapperNav } from "@/components/layout/partials/sidebar/wrapper-nav";
import { UserProvider } from "@/contexts/user-provider";
import { getCurrentUser } from "@/lib/firebase";
import { isUserAuthenticated } from "@/lib/firebase/admin";
import { redirect } from "next/navigation";

export default async function StudentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAuthenticated = await isUserAuthenticated();
	if (!isAuthenticated) redirect("/signin");

	const user = await getCurrentUser();
	return (
		<LayoutWrapper>
			<div className="flex lg:flex-row flex-col overflow-hidden">
				<UserProvider user={user}>
					<WrapperNav />
					<main id="layout" className="w-full h-screen pr-1">
						{children}
					</main>
				</UserProvider>
			</div>
		</LayoutWrapper>
	);
}
