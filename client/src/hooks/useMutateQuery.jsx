import { useMutation } from "react-query";
import { useAxios } from "./useAxios";

export const useMutateQuery = (key, url) => {
	const axios = useAxios();
	console.log(url);
	return useMutation([key], async (data) => await axios.post(url, data));
};
