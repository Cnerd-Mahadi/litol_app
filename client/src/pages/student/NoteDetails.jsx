import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { Accordion } from "src/components/layouts/Accordion";
import Sidebar from "src/components/layouts/Sidebar";
import { Link } from "src/components/ui/Link";
import { sidebarInfo } from "src/utils/resources";
import { Loading } from "../../components/layouts/Loading";
import { useGetQuery } from "../../hooks/useGetQuery";

export const NoteDetails = () => {
	const { noteId } = useParams();

	const { isLoading, data: response } = useGetQuery(
		["student/note", noteId],
		`student/note/${noteId}`
	);

	const note = response ? response.data.note : null;
	const notes = response ? response.data.notes : null;

	if (isLoading) return <Loading />;

	return (
		<Container maxWidth="lg">
			<Grid
				container
				spacing={5}
				sx={{ mt: 3, mb: 3 }}
				justifyContent={"space-between"}>
				<Grid item xs={8} px={2}>
					<Grid
						item
						xs={12}
						sx={{
							mt: 4,
						}}>
						<Typography variant="h4" marginBottom={1}>
							{note.data.title}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								ml: 0.5,
								mb: 4,
							}}>
							<b>Created at</b> {note.data.updated}
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
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<Sidebar tldr={sidebarInfo.notes.tldr} type={sidebarInfo.notes.type}>
						{notes &&
							notes.map((content) => (
								<Link
									to={`/student/note/${content.id}`}
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
