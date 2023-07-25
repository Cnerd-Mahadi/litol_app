import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { TopicCard } from "./../../components/cards/TopicCard";

const showContents = ({ content_id, title, image, detail }) => {
	return (
		<TopicCard
			key={content_id}
			id={content_id}
			image={image}
			title={title}
			detail={detail}
		/>
	);
};

const localUserData = getLocalData("userData");

export const Content = () => {
	const { subjectId } = useParams();
	const { isLoading, data: contents } = useGetQuery(
		"subject/contents",
		`student/subject/${subjectId}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

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
