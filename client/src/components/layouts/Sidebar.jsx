import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

export default function Sidebar({ tldr, type, children }) {
	return (
		<Grid item xs={12}>
			<Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
				<Typography variant="h6" gutterBottom>
					TLDR;
				</Typography>
				<Typography>{tldr}</Typography>
			</Paper>
			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				{type}
			</Typography>
			{children}
		</Grid>
	);
}

Sidebar.propTypes = {
	tldr: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};
