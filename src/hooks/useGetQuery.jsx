import { useQuery } from "react-query";
import { Axios } from "src/services/Axios";

export const useGetQuery = (key, url, payload) => {
	return useQuery(key, async () => {
		const instance = await Axios();
		return await instance.get(url, {
			params: payload,
		});
	});
};
