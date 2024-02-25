import { Box, Container, Stack, Typography } from "@mui/material";
import { NoteForm } from "src/components/layouts/Note/NoteForm";
import { images } from "src/utils/resources";

export const CreateNote = () => {
	return (
		<Container component="main" maxWidth="sm" sx={{ pb: 12 }}>
			<Stack alignItems="center" spacing={1} pb={2}>
				<Box component="img" src={images.note} width={300} alt="summary" />
				<Typography variant="h3">Create New Note</Typography>
			</Stack>
			<NoteForm />
		</Container>
	);
};
