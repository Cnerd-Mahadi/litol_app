import { useMutation } from "react-query";
import { Axios } from "../services/Axios";

export const useMutateQuery = (key, url, header = "application/json") => {
	return useMutation({
		mutationKey: [key],
		mutationFn: async (data) => {
			const instance = await Axios(header);
			return await instance.post(url, data);
		},
	});
};
