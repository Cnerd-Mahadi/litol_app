import {
	Box,
	Button,
	Collapse,
	Grid,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Image from "mui-image";
import { BiSolidEdit } from "react-icons/bi";
import { BreadCrumbs } from "src/components/ui/BreadCrumbs";
import { Link } from "src/components/ui/Link";
import { Loading } from "src/components/ui/Loading";
import { HorizontalImageCard } from "src/components/ui/horizontal_cards/HorizontalImageCard";
import { colors } from "src/utils";
import { images } from "src/utils/resources";
import { useGetQuery } from "../../hooks/useGetQuery";

export const SummaryDetails = () => {
	const theme = useTheme();
	const { summaryId } = useParams();
	const [showDetails, toggleDetails] = useState(false);
	console.log(summaryId);

	const { isLoading, data: response } = useGetQuery(
		["student/summary", summaryId],
		`student/summary/${summaryId}`
	);

	const breadcrumbs = [
		<Link key="1" to="/student/summary">
			<Typography variant="h5" color={colors.text}>
				Summaries
			</Typography>
		</Link>,
		<Typography key="2" variant="h5" color={colors.text_light}>
			Details
		</Typography>,
	];

	const summary = response ? response.data.summary : null;
	const summaries = response ? response.data.summaries : null;

	if (isLoading) return <Loading sx={{ my: 4 }} />;

	return (
		<Box py={3}>
			<Grid container justifyContent={"space-between"}>
				<Grid item xs={8.5} container justifyContent={"center"} pb={35}>
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						title="Details"
						sx={{
							width: "80%",
						}}
					/>
					<Stack width={"80%"}>
						<Stack
							spacing={2}
							sx={{
								p: 1.5,
							}}>
							<Image
								src={summary.imageUrl}
								alt="summary image"
								height={400}
								style={{
									objectFit: "cover",
									borderRadius: 12,
									boxShadow: theme.shadows[3],
								}}
							/>
							<Stack>
								<Stack
									direction={"row"}
									px={1}
									py={0.4}
									bgcolor={colors.blue_light}
									borderRadius={4}>
									<Box component={"img"} width={100} src={images.summary} />
									<Stack
										spacing={1}
										sx={{
											py: 1.2,
											px: 2,
										}}>
										<Typography variant="h4" fontWeight={700}>
											{summary.data.title}
										</Typography>
										<Typography variant="h5" color={colors.text_light}>
											{summary.data.updated}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
							<Stack
								spacing={4}
								sx={{
									pb: 1.2,
									pt: 6,
									px: 2,
								}}>
								<Typography variant="h3" fontWeight={700} textAlign={"center"}>
									Summary Details
								</Typography>
								<Stack
									direction="row"
									justifyContent="space-between"
									spacing={3}>
									{summary.data.keywords.map((data) => {
										return (
											<Stack
												key={data}
												direction="row"
												alignItems={"center"}
												justifyContent={"center"}
												spacing={2}
												flex={1}
												sx={{
													p: 1,
													backgroundColor: theme.palette.primary.light,
													color: theme.palette.primary.main,
													borderRadius: 5,
												}}>
												<Stack
													direction="row"
													spacing={1}
													alignItems={"center"}>
													<BiSolidEdit />
													<Typography variant="h5" textTransform={"capitalize"}>
														{data}
													</Typography>
												</Stack>
											</Stack>
										);
									})}
								</Stack>
								<Stack spacing={2} px={1}>
									<Collapse in={showDetails}>
										<Typography
											variant="body1"
											sx={{
												p: 2,
											}}>
											{summary.data.details}
										</Typography>
									</Collapse>
									<Button
										variant="outlined"
										onClick={() => {
											toggleDetails(!showDetails);
										}}
										sx={{
											mt: 2,
										}}>
										{showDetails ? "Hide Details" : " Show Details"}
									</Button>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</Grid>
				<Grid
					item
					xs={3.5}
					sx={{
						borderLeft: `1px solid ${theme.palette.divider}`,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{summaries && (
						<>
							<Typography variant="h5" textAlign={"center"} pb={5} pt={3}>
								See Your Recent Summaries
							</Typography>
							<Stack alignItems={"flex-start"} spacing={4}>
								{summaries.map((content) => (
									<HorizontalImageCard
										key={content.id}
										link={`/student/summary/${content.id}`}
										image={content.imageUrl}
										actionText={content.data.title}
										lightText={content.data.updated}
									/>
								))}
							</Stack>
						</>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};
