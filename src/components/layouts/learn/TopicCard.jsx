import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import { colors } from "src/utils";
import { Link } from "../../ui/Link";

export const TopicCard = ({ id, title, image, subject }) => {
	return (
		<Link to={`/student/learn/topic/${id}`}>
			<Card>
				<Image height={180} src={image} duration={1000} />
				<CardContent>
					<CardActionArea>
						<Typography variant="h5" pb={1}>
							{title}
						</Typography>
						<Typography variant="body2" color={colors.text_light} noWrap>
							{subject}
						</Typography>
					</CardActionArea>
				</CardContent>
			</Card>
		</Link>
	);
};

TopicCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
};
