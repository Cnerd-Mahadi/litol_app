import { Typography } from "@mui/material";

export const CopyRight = ({ sx, children }) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...sx}>
			{children}
		</Typography>
	);
};
