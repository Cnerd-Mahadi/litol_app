import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { TopicCard } from "src/components/layouts/Learn/TopicCard";
import { BreadCrumbs } from "src/components/ui/BreadCrumbs";
import { Link } from "src/components/ui/Link";
import { Loading } from "src/components/ui/Loading";

import { useGraphQuery } from "src/hooks/useGraphQuery";
import { colors } from "src/utils";
import { contentsQuery } from "src/utils/graphqlQueries";

const breadcrumbs = [
	<Link key="1" to="/student/learn">
		<Typography variant="h5" color={colors.text}>
			Learn
		</Typography>
	</Link>,
	<Typography key="2" variant="h5" color={colors.text_light}>
		Topic
	</Typography>,
];

const showContents = ({ title, subjectRef, image, sys }) => {
	return (
		<Grid key={sys.id} item md={3}>
			<TopicCard
				id={sys.id}
				image={image.url}
				title={title}
				subject={subjectRef.name}
			/>
		</Grid>
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
		<>
			<BreadCrumbs
				breadcrumbs={breadcrumbs}
				title="Topic"
				sx={{
					px: 2,
				}}
			/>
			<Grid container paddingX={4} spacing={4}>
				{contents.map(showContents)}
			</Grid>
		</>
	);
};
