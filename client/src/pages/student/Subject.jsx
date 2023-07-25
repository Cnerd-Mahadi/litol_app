import { Box } from "@mui/system";
import React from "react";
import { useGetQuery } from "../../hooks/useGetQuery";
import { subjectImages } from "../../utilities/staticImageResources";
import { getHeader, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { SubjectCard } from "./../../components/cards/SubjectCard";
import { getLocalData } from "./../../utilities/utility";

const showSubjects = ({ subject_id, subject_name }) => {
	return (
		<SubjectCard
			key={subject_id}
			id={subject_id}
			image={subjectImages[subject_name]}
			subject={subject_name}
		/>
	);
};

const localUserData = getLocalData("userData");

export const Subject = () => {
	const { isLoading, data: subjects } = useGetQuery(
		"subjects",
		"student/subjects",
		getHeader(headerType.tokenize, localUserData.token)
	);

	if (isLoading) return <Loading />;

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
