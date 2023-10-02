import { Grid } from "@mui/material";
import { NoteCard } from "src/components/layouts/Note/NoteCard";
import { Loading } from "src/components/ui/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";

const getContents = ({ data, id }) => {
	return (
		<Grid key={id} item md={3}>
			<NoteCard id={id} title={data.title} updated={data.updated} />
		</Grid>
	);
};

export const NoteGallery = () => {
	const { isLoading, data: response } = useGetQuery(
		"student/notes",
		`student/notes/${localUserData().uid}`
	);

	const notes = response ? response.data.notes : [];

	if (isLoading) return <Loading />;

	return notes.length ? (
		<Grid container padding={4} paddingBottom={32} spacing={4}>
			{notes.map(getContents)}
		</Grid>
	) : (
		<NotAvailable
			sx={{
				mx: 4,
			}}
			contentType="note content"
		/>
	);
};
