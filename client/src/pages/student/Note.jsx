import { Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { NoteCard } from "src/components/cards/NoteCard";
import { FormHead } from "src/components/layouts/FormHead";
import { Loading } from "src/components/layouts/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { NoteForm } from "src/components/ui/forms/NoteForm";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";
import { images } from "src/utils/resources";

const getContents = ({ data, id }) => {
	return (
		<NoteCard key={id} id={id} title={data.title} updated={data.updated} />
	);
};

const paper = {
	pt: 2,
	pb: 5,
	mt: 12,
	mb: 6,
	backgroundColor: "#fafafa",
	borderRadius: "48px 48px 0px 0px",
};

export const Note = () => {
	const { isLoading, data: response } = useGetQuery(
		"student/notes",
		`student/notes/${localUserData().userInfo.id}`
	);

	const notes = response ? response.data.notes : [];

	return (
		<>
			<Container component="main" maxWidth="sm" sx={{ minHeight: "500px" }}>
				<FormHead icon={images.note} title="Create New Note" />
				<NoteForm />
			</Container>
			<Paper elevation={3} sx={paper}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 700,
						textAlign: "center",
						mb: 3,
					}}>
					Note Gallery
				</Typography>
				<Box>
					{isLoading ? (
						<Loading />
					) : notes.length ? (
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								py: 3,
							}}>
							{notes.map(getContents)}
						</Box>
					) : (
						<NotAvailable contentType="note" />
					)}
				</Box>
			</Paper>
		</>
	);
};
