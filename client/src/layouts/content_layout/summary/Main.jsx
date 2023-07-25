import { Box, Button, Chip, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";

function Main({ content }) {
	const [showDetails, toggleDetails] = useState(false);

	return (
		<Grid
			item
			xs={6}
			sx={{
				mt: 4,
			}}>
			<Typography variant="h3" gutterBottom>
				{content.details.title}
			</Typography>
			<Divider />
			<Paper
				elevation={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					listStyle: "none",
					p: 1,
					mt: 1,
				}}>
				{content.keywords.map((data) => {
					return (
						<Box key={data.keyword_id}>
							<Chip color="primary" label={data.keyword} />
						</Box>
					);
				})}
			</Paper>
			<Typography
				sx={{ display: showDetails ? "block" : "none", mt: 2 }}
				variant="body1"
				marginTop={2}>
				{content.details.details}
			</Typography>
			<Button
				variant="contained"
				onClick={() => {
					toggleDetails(!showDetails);
				}}
				sx={{
					mt: 2,
				}}>
				Show Details
			</Button>
		</Grid>
	);
}
export default Main;
