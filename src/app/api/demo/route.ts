import { env } from "@/env";
import { auth } from "@/lib/auth";
import { generalLimiter } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function POST(request: Request) {
	const ip =
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		"anonymous";

	try {
		const { success } = await generalLimiter.limit(`demo:${ip}`);
		if (!success) {
			return Response.json({ error: "Too many requests." }, { status: 429 });
		}
	} catch {}

	let authResponse: Response;
	try {
		authResponse = await auth.api.signInEmail({
			body: { email: env.DEMO_EMAIL, password: env.DEMO_PASSWORD },
			headers: await headers(),
			asResponse: true,
		});
	} catch {
		return Response.json({ error: "Demo sign-in failed." }, { status: 500 });
	}

	if (!authResponse.ok) {
		return Response.json({ error: "Demo sign-in failed." }, { status: 500 });
	}

	const responseHeaders = new Headers();
	authResponse.headers.forEach((value, key) => {
		if (key.toLowerCase() === "set-cookie") {
			responseHeaders.append("set-cookie", value);
		}
	});

	return new Response(null, { status: 200, headers: responseHeaders });
}
