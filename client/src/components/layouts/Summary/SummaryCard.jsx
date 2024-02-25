import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import { Link } from "../../ui/Link";

export const SummaryCard = ({ id, title, details, image }) => {
	return (
		<Link to={`/student/summary/${id}`}>
			<Card>
				<Image height={180} src={image} duration={1000} />
				<CardContent>
					<CardActionArea>
						<Typography variant="h5" pb={1}>
							{title}
						</Typography>
					</CardActionArea>
					<Typography variant="body2" color="text.secondary" noWrap>
						{details}
					</Typography>
				</CardContent>
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
