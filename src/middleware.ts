import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionCookie = getSessionCookie(request);

	const isSignIn = pathname === "/signin";

	if (!sessionCookie && !isSignIn) {
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	if (sessionCookie && isSignIn) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)"],
};
