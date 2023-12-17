import { Box, Card, CardActionArea, CardContent, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import { images } from "src/utils/resources";
import { Link } from "../../ui/Link";

export const MindMapCard = ({ id, title, updated }) => {
	return (
		<Link to={"/student/mindmap/" + id} underline="none">
			<Card>
				<Box
					component="img"
					height={90}
					src={images.mindmap}
					sx={{
						p: 1,
						display: "block",
						margin: "auto",
					}}
				/>
				<CardContent sx={{ px: 1.3, py: 0.5 }}>
					<Stack
						sx={{
							width: "100%",
							borderRadius: 1,
							backgroundColor: "white",
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

MindMapCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	updated: PropTypes.string.isRequired,
};
