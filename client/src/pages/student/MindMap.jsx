import { Box, Container, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MindMapCard } from "src/components/layouts/Mindmap/MindMapCard";
import { Link } from "src/components/ui/Link";
import { Loading } from "src/components/ui/Loading";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";
import { images } from "src/utils/resources";

const getContents = ({ id, data }) => {
	return (
		<Grid key={id} item md={3}>
			<MindMapCard id={id} title={data.title} updated={data.updated} />
		</Grid>
	);
};

export const MindMap = () => {
	const { isLoading, data: response } = useGetQuery(
		["student/mindmaps", localUserData().uid],
		`student/mindmaps/${localUserData().uid}`
	);

	const mindmaps = response ? response.data.mindmaps : [];

	return (
		<Container component="main">
			<Stack alignItems="center" spacing={1} pb={2}>
				<Box component="img" src={images.mindmap} width={300} alt="summary" />
				<Typography variant="h3">Create New Mind Map</Typography>
			</Stack>
			<Grid item xs={12} textAlign="end">
				<Link to={`/student/mindmap/board/6ff59a16d0df455b8e35`}>
					<Button type="submit" variant="contained" sx={{ px: 3.5, my: 2 }}>
						Create
					</Button>
				</Link>
			</Grid>
			{isLoading ? (
				<Loading />
			) : mindmaps.length ? (
				<Grid container padding={4} paddingBottom={32} spacing={4}>
					{mindmaps.map(getContents)}
				</Grid>
			) : (
				<NotAvailable contentType="mindmap content" />
			)}
		</Container>
	);
};
