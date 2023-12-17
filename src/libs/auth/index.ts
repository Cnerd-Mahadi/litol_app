import { auth } from "@/services/firebase/index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signIn = async () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider).then((result) => {
		if (!result.user) throw new Error("Couldnt sign in please try again!");
		return true;
	});
};
