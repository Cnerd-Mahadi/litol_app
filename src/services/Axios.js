import axios from "axios";
import { baseURL, localUserData, setLocalData } from "src/utils";
import { auth } from "./firebase";

export const Axios = async (header) => {
	const instance = axios.create({
		baseURL: baseURL,
		headers: {
			"Content-Type": header,
		},
	});
	const localData = localUserData();

	if (Date.parse(localData.expiration) < Date.now()) {
		const tokenStatus = await auth.currentUser?.getIdTokenResult();
		setLocalData("user", {
			...localData,
			token: tokenStatus.token,
			expiration: tokenStatus.expirationTime,
		});
	}

	const token = localUserData().token;
	instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	return instance;
};
