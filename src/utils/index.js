import axios from "axios";
import { QueryClient } from "react-query";

export const setLocalData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const localUserData = () => {
	return getLocalData("user");
};

export const baseURL = "https://litolapp-production.up.railway.app/api/";
// "http://127.0.0.1:8000/api/";

export const queryClient = new QueryClient();

let onlyUsedForDebouncedTimeout = null;
export function debounce(cb, delay = 500) {
	return (...args) => {
		clearTimeout(onlyUsedForDebouncedTimeout);
		return new Promise((resolve) => {
			onlyUsedForDebouncedTimeout = setTimeout(() => {
				const result = cb(...args);
				resolve(result);
			}, delay);
		});
	};
}

export const checkUniqueValue = debounce(async (url, params) => {
	const response = await axios.get(baseURL + url, {
		params: params,
		headers: {
			Authorization: `Bearer ${localUserData() ? localUserData().token : ""}`,
		},
	});
	return response.data;
});

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

export const colors = {
	black: "#000",
	white: "#fff",

	blue_light: "#e0f2fe",
	blue: "#3b82f6",
	blue_dark: "#2563eb",
	blue_variant: "#60a5fa",

	text_dark: "#334155",
	text: "#475569",
	text_light: "#94a3b8",

	error_light: "#fecaca",
	error: "#ef4444",

	success_light: "#a7f3d0",
	success: "#34d399",

	divider: "#e4e4e7",
	disabled: "#d4d4d4",
};

export const shadows = {
	none: "none",
	shadow_main:
		"rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
	shadow_small: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	shadow_regular:
		"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
	shadow_medium:
		"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
};
