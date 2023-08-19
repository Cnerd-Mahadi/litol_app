import { Card, CardActionArea, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import { Link } from "../ui/Link";

const paper = {
	width: 240,
	borderRadius: "8px",
	backgroundColor: "white",
	color: "#2C3333",
	padding: "30px",
};

export const NoteCard = ({ id, title, updated }) => {
	return (
		<Link to={`/student/note/${id}`} underline="none">
			<Card sx={{ margin: "20px" }}>
				<CardActionArea>
					<Paper sx={paper}>
						<Typography gutterBottom variant="h6" component="div">
							{title}
						</Typography>
						<Typography variant="body2" color="text.primary" noWrap>
							{updated}
						</Typography>
					</Paper>
				</CardActionArea>
			</Card>
		</Link>
	);
};

NoteCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	updated: PropTypes.string.isRequired,
};
