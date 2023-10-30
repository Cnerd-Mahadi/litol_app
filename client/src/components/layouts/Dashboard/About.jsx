import { Box, Stack, Typography, useTheme } from "@mui/material";
import { borderStyle } from "src/styles/components/Layouts";
import { about, images } from "src/utils/resources";

export const About = () => {
	const theme = useTheme();
	return (
		<Stack
			direction="row"
			alignItems="center"
			sx={{
				...borderStyle(theme),
				px: 2,
				py: 4,
			}}>
			<Box component={"img"} src={images.about} height={250} />
			<Stack alignItems="center" spacing={3} px={6}>
				<Typography variant="h2" color={theme.palette.primary.main}>
					{about.name}
				</Typography>
				<Typography
					color={theme.palette.text.secondary}
					textAlign={"justify"}
					sx={{ pb: 8 }}>
					{about.details}
				</Typography>
			</Stack>
		</Stack>
	);
};
