import { Typography } from "@mui/material";
import { PropTypes } from "prop-types";

export const NotAvailable = ({ contentType }) => {
	return (
		<Typography variant="subtitle1" textAlign={"center"}>
			Sorry There is no {contentType} available currently
		</Typography>
	);
};

NotAvailable.propTypes = {
	contentType: PropTypes.string.isRequired,
};
