import axios from "axios";
import { baseURL } from "../utilities/utility";

export const apiPostDataHandler = async (url, data, header) => {
	return await axios
		.post(baseURL + url, data, {
			headers: header,
		})
		.then((response) => {
			return response.data;
		});
};

export const apiGetDataHandler = async (url, header) => {
	return await axios
		.get(baseURL + url, {
			headers: header,
		})
		.then((response) => {
			return response.data;
		});
};
