import {
	Box,
	Button,
	Chip,
	Collapse,
	Container,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import Image from "mui-image";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "src/components/layouts/Sidebar";
import { Link } from "src/components/ui/Link";
import { sidebarInfo } from "src/utils/resources";
import { Loading } from "../../components/layouts/Loading";
import { useGetQuery } from "../../hooks/useGetQuery";

const paper = {
	display: "flex",
	justifyContent: "space-between",
	flexWrap: "wrap",
	gap: 2,
	listStyle: "none",
	px: 2,
	py: 1,
	my: 2,
};

export const SummaryDetails = () => {
	const { summaryId } = useParams();
	const [showDetails, toggleDetails] = useState(false);
	console.log(summaryId);

	const { isLoading, data: response } = useGetQuery(
		["student/summary", summaryId],
		`student/summary/${summaryId}`
	);

	const summary = response ? response.data.summary : null;
	const summaries = response ? response.data.summaries : null;

	if (isLoading) return <Loading />;

	return (
		<Container maxWidth="lg">
			<Grid
				container
				spacing={5}
				sx={{ mt: 3, mb: 3 }}
				justifyContent={"space-between"}>
				<Grid item xs={8} px={2}>
					<Paper elevation={3}>
						<Image
							src={summary.imageUrl}
							alt="display image"
							width="100%"
							height={450}
						/>
					</Paper>
					<Grid
						item
						xs={8}
						sx={{
							mt: 4,
						}}>
						<Typography variant="h4" gutterBottom>
							{summary.data.title}
						</Typography>
						<Typography variant="body2" gutterBottom>
							<b>Created at</b> {summary.data.updated}
						</Typography>
						<Divider />
						<Paper elevation={3} sx={paper}>
							{summary.data.keywords.map((data) => {
								return (
									<Box
										key={data}
										sx={{
											flex: "1 1 auto",
											flexBasis: "0",
										}}>
										<Chip
											color="primary"
											label={data}
											sx={{
												width: "100%",
												my: 1,
												py: 2,
												borderRadius: "8px",
											}}
										/>
									</Box>
								);
							})}
						</Paper>
						<Collapse in={showDetails}>
							<Typography sx={{ mt: 2 }} variant="body1" marginTop={2}>
								{summary.data.details}
							</Typography>
						</Collapse>
						<Button
							variant="contained"
							onClick={() => {
								toggleDetails(!showDetails);
							}}
							sx={{
								mt: 2,
							}}>
							{showDetails ? "Hide Details" : " Show Details"}
						</Button>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Sidebar
						tldr={sidebarInfo.summaries.tldr}
						type={sidebarInfo.summaries.type}>
						{summaries &&
							summaries.map((content) => (
								<Link
									to={`/student/summary/${content.id}`}
									underline="none"
									display="block"
									key={content.id}>
									{content.data.title}
								</Link>
							))}
					</Sidebar>
				</Grid>
			</Grid>
		</Container>
	);
};
