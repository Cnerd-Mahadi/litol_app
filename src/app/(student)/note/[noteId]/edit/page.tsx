import { auth } from "@/lib/auth";
import { EditNotePageClient } from "@/ui/note/edit-note-page-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditNotePage({ params }: { params: { noteId: string } }) {
	const session = await auth.api.getSession({ headers: headers() });
	if (session?.user?.isDemo) redirect(`/note/${params.noteId}`);
	return <EditNotePageClient noteId={params.noteId} />;
}
