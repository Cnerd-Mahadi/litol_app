import { contentfulUrl } from "./contentful-queries";

export const contentfulFetch = async (query: string) => {
	const response = await fetch(contentfulUrl, {
		method: "POST",
		body: JSON.stringify({
			query: query,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CONTENTFUL_AUTHORIZATION}`,
		},
	});
	const data = await response.json();
	return data;
};
