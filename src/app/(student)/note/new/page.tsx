import { auth } from "@/lib/auth";
import { NewNotePageClient } from "@/ui/note/new-note-page-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewNotePage() {
	const session = await auth.api.getSession({ headers: headers() });
	if (session?.user?.isDemo) redirect("/note");
	return <NewNotePageClient />;
}
