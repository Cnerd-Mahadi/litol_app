import { Card, CardActionArea, CardContent, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import { Link } from "../../ui/Link";

export const NoteCard = ({ id, title, updated }) => {
	return (
		<Link to={`/student/note/${id}`}>
			<Card>
				<CardContent>
					<Stack
						sx={{
							width: "100%",
							borderRadius: 1,
							backgroundColor: "white",
							padding: 1,
						}}>
						<CardActionArea>
							<Typography variant="h5" pb={1}>
								{title}
							</Typography>
						</CardActionArea>
						<Typography variant="body2" color="text.primary" noWrap>
							{updated}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Link>
	);
};

NoteCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	updated: PropTypes.string.isRequired,
};
