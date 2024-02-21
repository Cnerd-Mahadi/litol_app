import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseClientConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSEGING_SENDING_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app =
	getApps().length > 0 ? getApp() : initializeApp(firebaseClientConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function googleSignIn() {
	await signInWithRedirect(auth, provider);
}

export async function saveSession(idToken: string) {
	try {
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ idToken }),
		});
		const resBody = await response.json();
		if (response.ok && resBody.success) {
			return true;
		} else return false;
	} catch (error) {
		console.error("Error signing in with Google", error);
		return false;
	}
}

export async function signOut() {
	try {
		await auth.signOut();

		const response = await fetch("/api/auth/signout", {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const resBody = await response.json();
		if (response.ok && resBody.success) {
			return true;
		} else return false;
	} catch (error) {
		console.error("Error signing out with Google", error);
		return false;
	}
}
