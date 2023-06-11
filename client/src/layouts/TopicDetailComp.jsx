import { Divider, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";

export const TopicDetailComp = ({ topic }) => {
	return (
		<>
			<Container maxWidth="lg">
				<main>
					<Grid container spacing={5} sx={{ mt: 3, mb: 3 }}>
						<img
							src={require(`../../../server/storage/app/public/content/` +
								topic.image)}
							alt="my foot"
							width="70%"
							height="450px"
						/>
					</Grid>

					<Grid container spacing={5} sx={{ mt: 3, mb: 3 }}>
						<Grid item xs={12} md={8}>
							<Typography variant="h3" gutterBottom>
								{topic.title}
							</Typography>
							<Divider />
							<p>{topic.detail}</p>
						</Grid>
					</Grid>
				</main>
			</Container>
		</>
	);
};
