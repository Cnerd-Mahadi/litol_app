import axios from "axios";
import { baseURL } from "../utilities/utility";

export const apiPostDataHandler = async (url, data) => {
	return await axios.post(baseURL + url, data);
};

export const apiGetDataHandler = (url, data) => {
	axios.get(baseURL + url, data).then((response) => {
		return response;
	});
};
