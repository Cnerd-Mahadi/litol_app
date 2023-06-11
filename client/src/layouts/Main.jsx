import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Main({ content, role }) {
	return (
		<Grid
			item
			xs={12}
			sx={{
				mt: 4,
			}}>
			<Typography variant="h3" gutterBottom>
				{content.title}
			</Typography>
			<Divider />
			{role === "STUDENT" && <h6>{content.student.user.username}</h6>}
			<Typography variant="body1" marginTop={2}>
				{content.detail}
			</Typography>
		</Grid>
	);
}
export default Main;
