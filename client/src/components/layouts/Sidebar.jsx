import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

export default function Sidebar({ type, children }) {
	return (
		<Grid item xs={12}>
			<Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
				{type}
			</Typography>
			{children}
		</Grid>
	);
}

Sidebar.propTypes = {
	tldr: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.node,
};
