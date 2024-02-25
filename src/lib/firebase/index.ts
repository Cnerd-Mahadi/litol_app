"use server";

import { userSchema } from "@/types";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { isUserAuthenticated } from "./admin";

export async function getSession() {
	try {
		return cookies().get("__session")?.value;
	} catch (error) {
		return undefined;
	}
}

export async function getCurrentUser() {
	const session = await getSession();
	if (!session || !(await isUserAuthenticated(session))) {
		throw new Error("Session not found or not valid!");
	}

	const decodedIdToken = await getAuth().verifySessionCookie(session);
	const retrievedUser = await getAuth().getUser(decodedIdToken.uid);
	const userRaw = {
		name: retrievedUser.displayName,
		email: retrievedUser.email,
		image: retrievedUser.photoURL,
		id: retrievedUser.uid,
	};

	const user = userSchema.parse(userRaw);
	return user;
}
