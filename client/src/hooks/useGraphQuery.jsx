import { useQuery } from "react-query";
import { requestUrl } from "src/utils/graphqlQueries";

export const useGraphQuery = (key, query) => {
	return useQuery([key], async () => {
		return await fetch(requestUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer DC4u9BY4yugEYxmzEadoAdHbFfk6GawAZXwf6uT8llo",
			},
			body: JSON.stringify({
				query: query,
			}),
		}).then((res) => res.json());
	});
};
