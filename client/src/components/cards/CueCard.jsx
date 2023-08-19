import { Box, Button, Paper, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const cueButton = {
	display: "flex",
	gap: 4,
	backgroundColor: "#F9FCFB",
	color: "#2C3333",
	padding: 6,
	height: "200px",
	width: "500px",
	borderRadius: "15px",
	"&:hover": {
		backgroundColor: "#04293A",
		color: "white",
	},
};

export const CueCard = ({ image, text }) => {
	return (
		<Paper elevation={3} sx={{ width: "100%", borderRadius: "15px" }}>
			<Button variant="contained" sx={cueButton}>
				<Box component="img" src={image} alt={text} width={100} height={100} />
				<Typography variant="h4">{text}</Typography>
			</Button>
		</Paper>
	);
};

CueCard.propTypes = {
	image: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
