"use server";

import { userSchema } from "@/types";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";

export async function getSession() {
	try {
		return cookies().get("__session")?.value;
	} catch (error) {
		return undefined;
	}
}

export async function getCurrentUser() {
	const session = await getSession();
	if (!session) {
		throw new Error("Session not found or not valid!");
	}

	const userRaw = (await JSON.parse(session)).user;
	const user = userSchema.parse(userRaw);
	return user;
}

export const getResponse = async (code: string) => {
	const oAuth2Client = new OAuth2Client(
		process.env.AUTH_GOOGLE_ID,
		process.env.AUTH_GOOGLE_SECRET,
		"postmessage"
	);
	const { tokens } = await oAuth2Client.getToken(code);
	console.log(tokens, "__________IOP");
	return tokens.id_token;
};
