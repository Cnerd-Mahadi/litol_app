import { Box, Container, Paper, Typography } from "@mui/material";
import { SummaryCard } from "src/components/cards/SummaryCard";
import { FormHead } from "src/components/layouts/FormHead";
import { Loading } from "src/components/layouts/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { SummaryForm } from "src/components/ui/forms/SummaryForm";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";
import { images } from "src/utils/resources";

const paper = {
	pt: 2,
	pb: 5,
	mt: 12,
	mb: 6,
	backgroundColor: "#fafafa",
	borderRadius: "48px 48px 0px 0px",
};

const gallery = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
	py: 3,
};

const getContents = ({ data, id, imageUrl }) => {
	return (
		<SummaryCard
			key={id}
			id={id}
			title={data.title}
			details={data.details}
			image={imageUrl}
		/>
	);
};

export const Summary = () => {
	const { isLoading, data: response } = useGetQuery(
		"student/summaries",
		`student/summaries/${localUserData().userInfo.id}`
	);

	const summaries = response ? response.data.summaries : [];

	console.log(summaries);

	return (
		<>
			<Container component="main" maxWidth="sm" sx={{ minHeight: "500px" }}>
				<FormHead icon={images.summary} title="Create New Summary" />
				<SummaryForm />
			</Container>
			<Paper elevation={3} sx={paper}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 700,
						textAlign: "center",
						mb: 3,
					}}>
					Summary Gallery
				</Typography>
				<Box>
					{isLoading ? (
						<Loading />
					) : summaries.length ? (
						<Box sx={gallery}>{summaries.map(getContents)}</Box>
					) : (
						<NotAvailable contentType="summary content" />
					)}
				</Box>
			</Paper>
		</>
	);
};
