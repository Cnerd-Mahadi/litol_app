import { Box, Container, Stack, Typography } from "@mui/material";
import { SummaryForm } from "src/components/layouts/Summary/SummaryForm";
import { images } from "src/utils/resources";

export const CreateSummary = () => {
	return (
		<Container
			component="main"
			maxWidth="sm"
			sx={{
				pb: 12,
			}}>
			<Stack alignItems="center" pb={2}>
				<Box component="img" src={images.summary} width={300} alt="summary" />
				<Typography variant="h3">Create New Summary</Typography>
			</Stack>
			<SummaryForm />
		</Container>
	);
};
