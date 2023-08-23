import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

import { TopicCard } from "src/components/cards/TopicCard";
import { Loading } from "src/components/layouts/Loading";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { contentsQuery } from "src/utils/graphqlQueries";

const showContents = ({ title, subjectRef, image, sys }) => {
	return (
		<TopicCard
			key={sys.id}
			id={sys.id}
			image={image.url}
			title={title}
			subject={subjectRef.name}
		/>
	);
};

export const Content = () => {
	const { subjectId } = useParams();
	const { isLoading, data } = useGraphQuery(
		["contents", subjectId],
		contentsQuery(subjectId)
	);

	const contents = data ? data.data.contentCollection.items : null;

	if (isLoading) return <Loading />;

	console.log(contents);
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				marginTop: "20px",
			}}>
			{contents.map(showContents)}
		</Box>
	);
};
