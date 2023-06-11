import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/utility";
import { TopicCard } from "./../../components/cards/TopicCard";

const showContents = ({ topic_id, title, image, detail }) => {
	return (
		<TopicCard
			key={topic_id}
			id={topic_id}
			image={image}
			title={title}
			detail={detail}
		/>
	);
};

export const Content = () => {
	const [contents, setContents] = React.useState([]);
	const { subjectId } = useParams();
	React.useEffect(() => {
		axios
			.get(baseURL + `student/subject?subject_id=${subjectId}`)
			.then((response) => {
				setContents(response.data);
			});
	}, [subjectId]);

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
