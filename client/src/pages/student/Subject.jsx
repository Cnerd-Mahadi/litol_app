import { Box } from "@mui/system";
import { SubjectCard } from "src/components/cards/SubjectCard";
import { Loading } from "src/components/layouts/Loading";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { subjectsQuery } from "src/utils/graphqlQueries";

const showSubjects = ({ name, image, sys }) => {
	return (
		<SubjectCard key={sys.id} id={sys.id} image={image.url} subject={name} />
	);
};

export const Subject = () => {
	const { isLoading, data } = useGraphQuery("subjects", subjectsQuery);
	console.log(data);
	const subjects = data ? data.data.subjectCollection.items : null;

	if (isLoading) return <Loading />;

	console.log(subjects);

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				marginTop: "20px",
			}}>
			{subjects?.map(showSubjects)}
		</Box>
	);
};
