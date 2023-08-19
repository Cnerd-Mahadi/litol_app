import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";

const container = {
	mt: 3,
	backgroundColor: "white",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

const text = {
	mb: 2,
	fontSize: "2rem",
	fontWeight: 700,
	color: "#18181b",
};

export const FormHead = ({ icon, title }) => {
	return (
		<Box sx={container}>
			<Box
				component="img"
				src={icon}
				height={100}
				width={100}
				alt="title-icon"
			/>
			<Typography sx={text}>{title}</Typography>
		</Box>
	);
};

FormHead.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};
