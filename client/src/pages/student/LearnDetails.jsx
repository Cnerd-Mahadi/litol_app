import { useParams } from "react-router-dom";
import { useGraphQuery } from "../../hooks/useGraphQuery";
import { ContentLayout } from "../../layouts/content_layout/learn/ContentLayout";
import { contentQuery } from "../../utilities/graphqlQueries";
import { Loading } from "../Loading";

export const LearnDetails = () => {
	const { topicId } = useParams();
	const { isLoading, data } = useGraphQuery("content", contentQuery(topicId));
	const content = data ? data.data.content : null;

	console.log(content);

	if (isLoading) return <Loading />;

	return <ContentLayout content={content} />;
};
