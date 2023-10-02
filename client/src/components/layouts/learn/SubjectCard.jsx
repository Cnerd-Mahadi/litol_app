import { CardActionArea, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

import { StarsRounded } from "@mui/icons-material";
import Image from "mui-image";
import { Link } from "../../ui/Link";

export const SubjectCard = ({ image, subject, id }) => {
	console.log(image);
	return (
		<Link to={`/student/learn/subject/${id}`}>
			<Card>
				<Image height={200} src={image} alt={subject} duration={1000} />
				<CardContent>
					<CardActionArea>
						<Stack direction="row" justifyContent="space-between">
							<Typography gutterBottom variant="h5">
								{subject}
							</Typography>
							<StarsRounded fontSize="small" />
						</Stack>
					</CardActionArea>
				</CardContent>
			</Card>
		</Link>
	);
};

SubjectCard.propTypes = {
	image: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};
