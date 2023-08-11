import { Box, Button, Chip, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
			<Typography variant="h4" gutterBottom>
				{content.data.title}
			</Typography>
			<Typography variant="body2" gutterBottom>
				<b>Created at</b> {content.data.updated}
			</Typography>
			<Divider />
			<Paper
				elevation={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexWrap: "wrap",
					listStyle: "none",
					px: 2,
					py: 1,
					my: 2,
				}}>
				{content.data.keywords.map((data) => {
					return (
						<Box key={data}>
							<Chip
								color="primary"
								label={data}
								sx={{
									mx: 2,
									my: 1,
									borderRadius: "8px",
								}}
							/>
						</Box>
					);
				})}
			</Paper>
			<Typography
				sx={{ display: showDetails ? "block" : "none", mt: 2 }}
				variant="body1"
				marginTop={2}>
				{content.data.details}
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
