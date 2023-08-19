import { Box, Link as MuiLink } from "@mui/material";
import { PropTypes } from "prop-types";
import { NavLink as RouteLink } from "react-router-dom";
import { colorCode } from "src/utils/resources";

export const NavLink = ({ children, ...props }) => {
	return (
		<RouteLink {...props} style={{ textDecoration: "none" }}>
			{({ isActive }) => (
				<MuiLink
					component={Box}
					sx={{
						py: 1,
						px: 2,
						fontWeight: 500,
						borderRadius: "5px",
						textDecoration: "none",
						color: isActive ? colorCode.navyBlue : colorCode.white,
						backgroundColor: isActive && colorCode.white,
						"&:hover": {
							color: colorCode.navyBlue,
							backgroundColor: colorCode.white,
						},
					}}>
					{children}
				</MuiLink>
			)}
		</RouteLink>
	);
};

NavLink.propTypes = {
	children: PropTypes.node.isRequired,
};
