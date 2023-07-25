import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ErrorStyle } from "../styles/mui-styles/containers";

export const Error = () => {
	return (
		<Box sx={ErrorStyle}>
			<Typography variant="h1" style={{ color: "white" }}>
				404
			</Typography>
			<Typography variant="h6" style={{ color: "white" }}>
				The page you're looking for doesn't exist.
			</Typography>
			<Button href="/" variant="contained">
				Back Home
			</Button>
		</Box>
	);
};
