import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import { NoteCard } from "src/components/layouts/Note/NoteCard";
import { Accordion } from "src/components/ui/Accordion";
import { BreadCrumbs } from "src/components/ui/BreadCrumbs";
import { Link } from "src/components/ui/Link";
import { Loading } from "src/components/ui/Loading";
import { colors } from "src/utils";
import { images } from "src/utils/resources";
import { useGetQuery } from "../../hooks/useGetQuery";

export const NoteDetails = () => {
	const theme = useTheme();
	const { noteId } = useParams();

	const { isLoading, data: response } = useGetQuery(
		["student/note", noteId],
		`student/note/${noteId}`
	);

	const breadcrumbs = [
		<Link key="1" to="/student/note">
			<Typography variant="h5" color={colors.text}>
				Notes
			</Typography>
		</Link>,
		<Typography key="2" variant="h5" color={colors.text_light}>
			Details
		</Typography>,
	];

	const note = response ? response.data.note : null;
	const notes = response ? response.data.notes : null;

	if (isLoading) return <Loading sx={{ my: 4 }} />;

	return (
		<Box py={3}>
			<Grid container justifyContent={"space-between"}>
				<Grid item xs={8.5} container justifyContent={"center"} pb={35}>
					<Stack width={"80%"}>
						<Stack
							spacing={2}
							sx={{
								p: 1.5,
							}}>
							<Stack>
								<Box
									px={2.5}
									py={2}
									bgcolor={colors.blue_light}
									borderRadius={4}>
									<BreadCrumbs breadcrumbs={breadcrumbs} title={"Details"} />
									<Box component={"img"} width={100} src={images.note} />
									<Stack
										spacing={1}
										sx={{
											py: 1,
											px: 2,
										}}>
										<Typography variant="h3" fontWeight={700}>
											{note.data.title}
										</Typography>
										<Typography variant="h5" color={colors.text_light}>
											{note.data.updated}
										</Typography>
									</Stack>
								</Box>
							</Stack>
							<Stack
								spacing={4}
								sx={{
									pb: 1.2,
									pt: 6,
									px: 2,
								}}>
								<Typography
									variant="h3"
									fontWeight={700}
									color={colors.text}
									textAlign={"center"}>
									Note Details
								</Typography>
								<Typography
									variant="body1"
									sx={{
										ml: 0.75,
										mb: 8,
									}}>
									{note.data.details}
								</Typography>
								{note.data.cues.map((data) => {
									return (
										<Box marginBottom={2} key={data.key}>
											<Accordion data={data} />
										</Box>
									);
								})}
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
					{notes && (
						<>
							<Typography variant="h5" textAlign={"center"} pb={5} pt={3}>
								See Your Recent Notes
							</Typography>
							<Stack alignItems={"stretch"} spacing={4}>
								{notes.map((content) => (
									<NoteCard
										key={content.id}
										id={content.id}
										title={content.data.title}
										updated={content.data.updated}
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
