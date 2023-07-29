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

export const apiGetDataHandler = async (url, header, params) => {
	return await axios
		.get(baseURL + url, {
			params: params,
			headers: header,
		})
		.then((response) => {
			return response.data;
		});
};
