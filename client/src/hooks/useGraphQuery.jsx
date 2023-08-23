import axios from "axios";
import { useQuery } from "react-query";
import { requestUrl } from "src/utils/graphqlQueries";

export const useGraphQuery = (key, query) => {
	return useQuery(key, async () => {
		const response = await axios.post(
			requestUrl,
			{ query: query },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer DC4u9BY4yugEYxmzEadoAdHbFfk6GawAZXwf6uT8llo",
				},
			}
		);
		return response.data;
	});
};
