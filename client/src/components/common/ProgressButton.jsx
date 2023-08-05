import { Button, CircularProgress } from "@mui/material";
import React from "react";

export const ProgressButton = ({ loading, text }) => {
	return (
		<Button
			type="submit"
			disabled={loading}
			variant="contained"
			sx={{ mt: 3, mb: 2 }}>
			{text}
			{loading && (
				<CircularProgress size={"1rem"} sx={{ ml: 1 }} color="inherit" />
			)}
		</Button>
	);
};
