import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setLocalData } from "src/utils";
import { auth } from "./index";

export const signIn = async (navigate) => {
	const provider = new GoogleAuthProvider();

	signInWithPopup(auth, provider).then(async (result) => {
		const credential = result.user;
		const tokenStatus = await auth.currentUser?.getIdTokenResult();

		const localData = {
			uid: credential.uid,
			name: credential.displayName,
			email: credential.email,
			image: credential.photoURL,
			token: tokenStatus.token,
			expiration: tokenStatus.expirationTime,
		};
		setLocalData("user", localData);
		navigate("/student");
	});
};

export const isUserSignedIn = async () => {
	return new Promise((resolve) => {
		auth.onAuthStateChanged((user) => {
			resolve(user);
		});
	});
};
