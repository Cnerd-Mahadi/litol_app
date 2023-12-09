import { Box, Typography, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";
import { borderStyle } from "src/styles/components/Layouts";

export const NotAvailable = ({ contentType, ...props }) => {
	const theme = useTheme();
	return (
		<Box {...props}>
			<Typography
				variant="h4"
				sx={{
					...borderStyle(theme),
					py: 5,
					px: 4,
				}}
				textAlign={"center"}>
				Sorry There is no {contentType} available currently
			</Typography>
		</Box>
	);
};

NotAvailable.propTypes = {
	contentType: PropTypes.string.isRequired,
};
