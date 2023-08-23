import { Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MindMapCard } from "src/components/cards/MindMapCard";
import { FormHead } from "src/components/layouts/FormHead";
import { Loading } from "src/components/layouts/Loading";
import { Link } from "src/components/ui/Link";
import { NotAvailable } from "src/components/ui/NotAvailable";
import { useGetQuery } from "src/hooks/useGetQuery";
import { localUserData } from "src/utils";
import { images } from "src/utils/resources";

const getContents = ({ id, data }) => {
	return (
		<MindMapCard key={id} id={id} title={data.title} updated={data.updated} />
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

export const MindMap = () => {
	const { isLoading, data: response } = useGetQuery(
		["student/mindmaps", localUserData().userInfo.id],
		`student/mindmaps/${localUserData().userInfo.id}`
	);

	const mindmaps = response ? response.data.mindmaps : [];

	return (
		<>
			<Container component="main" maxWidth="sm" sx={{ minHeight: "500px" }}>
				<FormHead icon={images.mindmap} title="Create Mind Map" />
				<Grid item xs={12}>
					<Link to={`/student/mindmap/board/${localUserData().userInfo.id}`}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Start Mapping
						</Button>
					</Link>
				</Grid>
			</Container>

			<Paper elevation={3} sx={paper}>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 700,
						textAlign: "center",
						mb: 3,
					}}>
					Map Gallery
				</Typography>
				<Box>
					{isLoading ? (
						<Loading />
					) : mindmaps.length ? (
						<Box
							component={"div"}
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								py: 3,
							}}>
							{mindmaps.map(getContents)}
						</Box>
					) : (
						<NotAvailable contentType="mindmap content" />
					)}
				</Box>
			</Paper>
		</>
	);
};
