import { Stack, Typography, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { colors } from "src/utils";

export const NavItem = ({ navItem }) => {
	const theme = useTheme();
	return (
		<NavLink
			to={navItem.route}
			style={({ isActive }) => {
				return {
					textDecoration: "none",
					color: isActive ? theme.palette.primary.main : colors.text_dark,
				};
			}}>
			<Stack
				direction={"row"}
				alignItems={"center"}
				spacing={2}
				sx={{
					"&:hover": {
						cursor: "pointer",
						backgroundColor: theme.palette.primary.light,
						color: theme.palette.primary.main,
						borderRadius: 1.5,
					},
					p: 1,
				}}>
				{navItem.icon}
				<Typography variant="h5">{navItem.name}</Typography>
			</Stack>
		</NavLink>
	);
};

NavItem.propTypes = {
	navItem: PropTypes.object.isRequired,
};
