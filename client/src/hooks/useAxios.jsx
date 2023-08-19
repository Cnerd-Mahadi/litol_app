import axios from "axios";
import { PropTypes } from "prop-types";
import { baseURL, getLocalData } from "src/utils";

export const useAxios = (header) => {
	const localUserData = getLocalData("userData");
	const instance = axios.create({
		baseURL: baseURL,
		headers: {
			"Content-Type": header,
		},
	});

	instance.defaults.headers.common["Authorization"] = localUserData
		? `Bearer ${localUserData.token}`
		: "";

	return instance;
};

useAxios.propTypes = {
	header: PropTypes.string.isRequired,
};
