import { auth } from "@/lib/auth";
import { EditSummaryPageClient } from "@/ui/summary/edit-summary-page-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditSummaryPage({ params }: { params: { id: string } }) {
	const session = await auth.api.getSession({ headers: headers() });
	if (session?.user?.isDemo) redirect(`/summary/${params.id}`);
	return <EditSummaryPageClient id={params.id} />;
}
