import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";
import { getSession } from ".";

const firebaseAdminConfig = {
	credential: cert({
		privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
		projectId: process.env.NEXT_FIREBASE_PROJECTID,
	}),
};

const app =
	getApps().length > 0 ? getApp() : initializeApp(firebaseAdminConfig);

export const adminAuth = getAuth(app);

export async function isUserAuthenticated(
	session: string | undefined = undefined
) {
	const _session = session ?? (await getSession());
	if (!_session) return false;

	try {
		const isRevoked = !(await getAuth().verifySessionCookie(_session, true));
		return !isRevoked;
	} catch (error) {
		throw new Error("Sorry! Couldnt verify the user!", { cause: error });
	}
}

export async function createSessionCookie(
	idToken: string,
	sessionCookieOptions: SessionCookieOptions
) {
	return getAuth().createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
	const decodedIdToken = await getAuth().verifySessionCookie(session);
	return await getAuth().revokeRefreshTokens(decodedIdToken.sub);
}
