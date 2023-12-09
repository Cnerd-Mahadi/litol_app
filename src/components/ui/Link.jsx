import { Link as MuiLink } from "@mui/material";
import { PropTypes } from "prop-types";
import { Link as RouteLink } from "react-router-dom";

export const Link = ({ children, ...props }) => {
	return (
		<MuiLink component={RouteLink} {...props}>
			{children}
		</MuiLink>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
};
