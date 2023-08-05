import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Sidebar(props) {
	const { description, social, title, contents } = props;

	console.log(contents);

	return (
		<Grid item xs={12}>
			<Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
				<Typography variant="h6" gutterBottom>
					Tip Corner
				</Typography>
				<Typography>{description}</Typography>
			</Paper>
			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				Your Summary Gallery
			</Typography>
			{contents.length > 0 &&
				contents.map((content) => (
					<Link
						href={`/student/summary/${content.id}`}
						underline="none"
						display="block"
						variant="body1"
						key={content.id}>
						{content.data.title}
					</Link>
				))}
		</Grid>
	);
}

export default Sidebar;
