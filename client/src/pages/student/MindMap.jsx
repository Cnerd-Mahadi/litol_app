import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MindMapCard } from "src/components/cards/MindMapCard";
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
		"student/mindmaps",
		`student/mindmaps/${localUserData.userInfo.id}`
	);

	const mindmaps = response ? response.data.mindmaps : [];

	if (isLoading) return <Loading />;

	return (
		<>
			<Grid
				container
				spacing={2}
				maxWidth={"sm"}
				display={"flex"}
				justifyContent={"center"}
				sx={{
					m: "auto",
				}}>
				<Grid item xs={12} textAlign={"center"}>
					<Box
						component={"img"}
						src={images.mindmap}
						width={"50%"}
						alt="mindmap-form"
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h3" sx={{ textAlign: "center" }}>
						Create Mind Map
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Link to={`/student/mindmap/board/${localUserData.userInfo.id}`}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Start Mapping
						</Button>
					</Link>
				</Grid>
			</Grid>

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
					{mindmaps.length ? (
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
