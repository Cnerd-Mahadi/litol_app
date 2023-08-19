import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import { Link } from "../ui/Link";

export const SummaryCard = ({ id, title, details, image }) => {
	return (
		<Link to={`/student/summary/${id}`} underline="none">
			<Card sx={{ width: 240, margin: "20px" }}>
				<CardActionArea>
					<Image height={140} src={image} duration={1000} />
					<CardContent>
						<Typography gutterBottom variant="h6" component="div">
							{title}
						</Typography>
						<Typography variant="body2" color="text.primary" noWrap>
							{details}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

SummaryCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	details: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
};
