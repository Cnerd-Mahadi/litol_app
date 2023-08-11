import { Button, Paper, Typography } from "@mui/material";
import { CueButtonStyle } from "../../styles/mui-styles/buttons";

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
