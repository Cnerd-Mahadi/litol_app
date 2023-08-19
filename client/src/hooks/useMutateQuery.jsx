import { useMutation } from "react-query";
import { useAxios } from "./useAxios";

export const useMutateQuery = (key, url, header = "application/json") => {
	const axios = useAxios(header);
	return useMutation({
		mutationKey: [key],
		mutationFn: async (data) => await axios.post(url, data),
	});
};
