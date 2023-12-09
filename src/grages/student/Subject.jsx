import { Grid } from "@mui/material";
import { SubjectCard } from "src/components/layouts/Learn/SubjectCard";
import { Loading } from "src/components/ui/Loading";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { subjectsQuery } from "src/utils/graphqlQueries";

const showSubjects = ({ name, image, sys }) => {
	return (
		<Grid key={sys.id} item md={3}>
			<SubjectCard id={sys.id} image={image.url} subject={name} />
		</Grid>
	);
};

export const Subject = () => {
	const { isLoading, data } = useGraphQuery("subjects", subjectsQuery);
	console.log(data);
	const subjects = data ? data.data.subjectCollection.items : null;

	if (isLoading) return <Loading sx={{ my: 4 }} />;

	console.log(subjects);

	return (
		<Grid container padding={4} spacing={4}>
			{subjects?.map(showSubjects)}
		</Grid>
	);
};
