import { MenuItem } from "@mui/material";
import axios from "axios";
import { throttle } from "lodash";
import { featuresImages } from "./staticImageResources";

export const baseURL = "https://litolapi-production.up.railway.app/api/";
// "http://127.0.0.1:8000/api/";

export const setLocalData = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalData = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const headerType = {
	nodata: "No Data",
	tokenize: "Tokenize",
	multi: "Tokenize Multipart",
};

export const getHeader = (type, token) => {
	if (type === headerType.nodata) {
		return {};
	} else if (type === headerType.tokenize) {
		return {
			Authorization: `Bearer ${token}`,
		};
	} else if (type === headerType.multi) {
		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		};
	}
};

export const features = [
	{
		name: "Learn A Topic",
		image: featuresImages.learn,
		route: "/student/learn",
	},
	{
		name: "Summarize The Topic",
		image: featuresImages.summary,
		route: "/student/summary",
	},
	{
		name: "Use Cornell Method",
		image: featuresImages.cornell,
		route: "/student/note",
	},
	{
		name: "Mind Map",
		image: featuresImages.mindmap,
		route: "/student/mindmap",
	},
	{
		name: "Feynman Section",
		image: featuresImages.feynman,
		route: "/student/feynman",
	},
];

export const pages = [
	{
		name: "Learn",
		route: "/student/learn",
	},
	{
		name: "Summary",
		route: "/student/summary",
	},
	{
		name: "Cornell",
		route: "/student/note",
	},
	{
		name: "MindMap",
		route: "/student/mindmap",
	},
	{
		name: "Feynman",
		route: "/student/feynman",
	},
];

export const userSettings = ["Logout"];

export const toCapFirst = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkUniqueness = async (url, header, params) => {
	const response = await axios.get(baseURL + url, {
		params: params,
		headers: header,
	});
	return response.data.data;
};

export const debouncedCheckUniqueness = throttle(checkUniqueness, 500);

export const getSubjects = ({ subject_id, subject_name }) => {
	return (
		<MenuItem key={subject_id} value={subject_id}>
			{subject_name.toUpperCase()}
		</MenuItem>
	);
};

export const genderOptions = [
	{
		value: "male",
		label: "Male",
	},
	{
		value: "female",
		label: "Female",
	},
	{
		value: "other",
		label: "Other",
	},
];

export const colorCode = {
	navyBlue: "#083344",
	red: "#ef4444",
	white: "#f3f4f6",
};

export const MAX_FILE_SIZE = 102400; //100KB

export const initSnackContext = {
	open: false,
	severity: "success",
	message: "",
};

export function isValidFileType(value) {
	return (
		(value && value[0] && value[0].type === "image/jpeg") ||
		(value[0] && value[0].type === "image/png") ||
		(value[0] && value[0].type === "image/webp")
	);
}
