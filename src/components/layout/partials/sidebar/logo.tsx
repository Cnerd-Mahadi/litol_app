import { Box, Typography } from "@mui/material";

export const Logo = ({ ...props }) => {
	return (
		<Typography
			variant="h1"
			lineHeight={1.5}
			color="primary"
			textAlign={"center"}
			{...props}>
			litol
			<Box component={"span"} color="text.dark">
				.
			</Box>
		</Typography>
	);
};
