import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

import Image from "mui-image";
import { Link } from "../ui/Link";

export const SubjectCard = ({ image, subject, id }) => {
	console.log(image);
	return (
		<Link to={`/student/learn/subject/${id}`} underline="none">
			<Card sx={{ width: 280, margin: "20px" }}>
				<CardActionArea>
					<Image height={140} src={image} alt={subject} duration={1000} />
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{subject}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

SubjectCard.propTypes = {
	image: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
