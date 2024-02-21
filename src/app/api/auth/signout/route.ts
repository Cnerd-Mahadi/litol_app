import { revokeAllSessions } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const sessionCookie = cookies().get("__session")?.value;

	if (!sessionCookie)
		return NextResponse.json(
			{ success: false, error: "Session not found." },
			{ status: 400 }
		);

	cookies().delete("__session");

	await revokeAllSessions(sessionCookie);

	return Response.json({
		success: true,
		data: "Signed out successfully.",
	});
}
