import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "src/contexts/Auth";
import { baseURL } from "src/utils";

export const useAxios = () => {
	const auth = useContext(AuthContext).auth;
	const instance = axios.create({
		baseURL: baseURL,
	});

	instance.defaults.headers.common["Authorization"] = auth
		? `Bearer ${auth.token}`
		: "";

	return instance;
};
