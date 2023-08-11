import { Typography } from "@mui/material";

export const NotAvailable = ({ contentType }) => {
	return (
		<Typography variant="subtitle1" textAlign={"center"}>
			Sorry There is no {contentType} available currently
		</Typography>
	);
};
