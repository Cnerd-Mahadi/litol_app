import { Box } from "@mui/system";
import React from "react";
import { useGraphQuery } from "../../hooks/useGraphQuery";
import { subjectsQuery } from "../../utilities/graphqlQueries";
import { SubjectCard } from "./../../components/cards/SubjectCard";
import { Loading } from "./../Loading";

const showSubjects = ({ name, image, sys }) => {
	return (
		<SubjectCard key={sys.id} id={sys.id} image={image.url} subject={name} />
	);
};

export const Subject = () => {
	const { isLoading, data } = useGraphQuery("subjects", subjectsQuery);
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
			{subjects.map(showSubjects)}
		</Box>
	);
};
