import axios from "axios";
import { QueryClient } from "react-query";

export const setLocalData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const localUserData = () => {
	return getLocalData("userData");
};

export const baseURL = "https://litolapi-production.up.railway.app/api/";
//  "http://127.0.0.1:8000/api/";

export const queryClient = new QueryClient();

export const checkUniqueValue = async (url, params) => {
	const response = await axios.get(baseURL + url, {
		params: params,
		headers: {
			Authorization: `Bearer ${localUserData() ? localUserData().token : ""}`,
		},
	});
	return response.data;
};

export function isValidImage(value) {
	const image = value && value[0];
	if (!image) return false;

	return (
		value[0].type === "image/jpeg" ||
		value[0].type === "image/png" ||
		value[0].type === "image/webp" ||
		value[0].type === "image/jpg"
	);
}
