import { Box, Typography } from "@mui/material";
import { colors } from "src/utils";

export const Logo = ({ ...props }) => {
	return (
		<Typography
			variant="h1"
			fontWeight={800}
			color={colors.blue}
			textAlign={"center"}
			{...props}>
			litol
			<Box component={"span"} color={colors.text_dark}>
				.
			</Box>
		</Typography>
	);
};
