import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Main({ content }) {
	console.log(content);

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
			<Typography variant="body1" marginTop={2}>
				{content.details}
			</Typography>
		</Grid>
	);
}
export default Main;
