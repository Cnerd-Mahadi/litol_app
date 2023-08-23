import { useQuery } from "react-query";
import { useAxios } from "./useAxios";

export const useGetQuery = (key, url, payload) => {
	const axios = useAxios();

	return useQuery(
		key,
		async () =>
			await axios.get(url, {
				params: payload,
			}),
		{
			cacheTime: 1000,
		}
	);
};
