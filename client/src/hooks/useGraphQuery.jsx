import { useQuery } from "react-query";
import { requestUrl } from "../utilities/graphqlQueries";

export const useGraphQuery = (key, query) => {
	const { isLoading, data } = useQuery([key], async () => {
		return fetch(requestUrl, {
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

	console.log(data, "Query");

	return { isLoading, data };
};
