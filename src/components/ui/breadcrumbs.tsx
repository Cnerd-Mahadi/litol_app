import {
	Breadcrumbs as MuiBreadcrumbs,
	Stack,
	Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { colors } from "src/utils";
export const BreadCrumbs = ({ title, breadcrumbs, ...props }) => {
	return (
		<Stack gap={1} m={2} {...props}>
			<Typography variant="h3" color={colors.blue} fontWeight={700}>
				{title}
			</Typography>
			<MuiBreadcrumbs separator=">">{breadcrumbs}</MuiBreadcrumbs>
		</Stack>
	);
};

BreadCrumbs.propTypes = {
	title: PropTypes.string.isRequired,
	breadcrumbs: PropTypes.array.isRequired,
};
