import { Grid } from "@mui/material";
import { SummaryCard } from "src/components/layouts/Summary/SummaryCard";
import { Loading } from "src/components/ui/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";

const getContents = ({ data, id, imageUrl }) => {
	return (
		<Grid key={id} item md={3}>
			<SummaryCard
				id={id}
				title={data.title}
				details={data.details}
				image={imageUrl}
			/>
		</Grid>
	);
};

export const SummaryGallery = () => {
	const { isLoading, data: response } = useGetQuery(
		"student/summaries",
		`student/summaries/${localUserData().uid}`
	);
	const summaries = response ? response.data.summaries : [];

	console.log(summaries);

	if (isLoading) return <Loading />;

	return summaries.length ? (
		<Grid container padding={4} paddingBottom={32} spacing={4}>
			{summaries.map(getContents)}
		</Grid>
	) : (
		<NotAvailable
			sx={{
				mx: 4,
			}}
			contentType="summary content"
		/>
	);
};
