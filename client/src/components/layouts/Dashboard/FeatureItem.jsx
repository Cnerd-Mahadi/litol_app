import { Box, Stack, Typography, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";
export const FeatureItem = ({ direction, feature, image }) => {
	const theme = useTheme();
	return (
		<Stack direction={direction} alignItems="center" spacing={2}>
			<Box component={"img"} src={image} height={300} />
			<Stack alignItems={"center"} spacing={2}>
				<Typography variant="h3" color={theme.palette.text.primary}>
					{feature.name}
				</Typography>
				<Typography color={theme.palette.text.secondary} maxWidth={"80%"}>
					{feature.details}
				</Typography>
			</Stack>
		</Stack>
	);
};

FeatureItem.propTypes = {
	direction: PropTypes.string.isRequired,
	feature: PropTypes.object.isRequired,
	image: PropTypes.string.isRequired,
};
