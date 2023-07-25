import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { baseURL } from "../utilities/utility";

export const useGetQuery = (key, url, header, payload) => {
	const [data, setData] = useState([]);
	const { isLoading, error, isError } = useQuery([key], () =>
		axios
			.get(baseURL + url, {
				params: payload,
				headers: header,
			})
			.then((response) => {
				setData(response.data.data);
			})
	);

	return {
		isLoading,
		data,
		error,
		isError,
	};
};
