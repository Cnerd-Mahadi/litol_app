import { Button, Paper, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const CueButtonStyle = {
	display: "flex",
	gap: "25px",
	backgroundColor: "#F9FCFB",
	color: "#2C3333",
	padding: "40px",
	height: "200px",
	width: "500px",
	borderRadius: "20px",
	"&:hover": {
		backgroundColor: "#04293A",
		color: "white",
	},
};

export const CueCard = ({ image, text }) => {
	return (
		<Paper elevation={3} sx={{ width: "100%", borderRadius: "48px" }}>
			<Button variant="contained" sx={CueButtonStyle}>
				<img src={image} alt="learn" width={100} height={100} />
				<Typography variant="h4">{text}</Typography>
			</Button>
		</Paper>
	);
};

CueCard.propTypes = {
	image: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
