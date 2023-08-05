import axios from "axios";
import { baseURL } from "../utilities/utility";

export const apiPostDataHandler = async (url, data, header) => {
	return axios
		.post(baseURL + url, data, {
			headers: header,
		})
		.then((response) => {
			return response.data;
		});
};

export const apiGetDataHandler = async (url, header, params) => {
	const response = await axios.get(baseURL + url, {
		params: params,
		headers: header,
	});
	console.log(response.data);
	return response.data;
};
