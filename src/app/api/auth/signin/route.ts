import { createSessionCookie } from "@/lib/firebase/admin";
import { User } from "firebase/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const reqBody = (await request.json()) as { idToken: string; user: User };
	const idToken = reqBody.idToken;
	const user = reqBody.user;
	const expiresIn = 60 * 60 * 24 * 5 * 1000;
	const sessionCookie = await createSessionCookie(idToken, { expiresIn });

	const cookieLocal = JSON.stringify({
		session: sessionCookie,
		user: {
			name: user.displayName,
			email: user.email,
			image: user.photoURL,
			id: user.uid,
		},
	});

	cookies().set("__session", cookieLocal, {
		maxAge: expiresIn,
		httpOnly: true,
		secure: true,
	});

	return NextResponse.json({
		success: true,
		data: "Signed in successfully",
	});
}
