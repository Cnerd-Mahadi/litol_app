import axios from "axios";
import { useQuery } from "react-query";
import { baseURL } from "../utilities/utility";

export const useGetQuery = (key, url, header, payload) => {
	const { isLoading, error, isError, data } = useQuery([key], async () =>
		axios
			.get(baseURL + url, {
				params: payload,
				headers: header,
			})
			.then((response) => {
				return response.data.data;
			})
	);
	return {
		isLoading,
		data,
		error,
		isError,
	};
};
