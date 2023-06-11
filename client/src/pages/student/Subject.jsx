import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { subjectImages } from "../../utilities/staticImageResources";
import { baseURL } from "../../utilities/utility";
import { SubjectCard } from "./../../components/cards/SubjectCard";

const showSubjects = ({ subject_id, subject_name }) => {
	console.log("../image/" + subject_name.toLowerCase() + ".jpg");
	return (
		<SubjectCard
			key={subject_id}
			id={subject_id}
			image={subjectImages[subject_name.toLowerCase()]}
			subject={subject_name}
		/>
	);
};

export const Subject = () => {
	const [subjects, setSubjects] = React.useState([]);
	React.useEffect(() => {
		axios.get(baseURL + "student/learnSection").then((response) => {
			setSubjects(response.data);
		});
	}, []);

	console.log("BC");
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
