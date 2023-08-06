import { Link, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { MindMapCard } from "../../components/cards/MindMapCard";
import { NotAvailable } from "../../components/common/NotAvailable";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const getContents = ({ id, data }) => {
	return (
		<MindMapCard key={id} id={id} title={data.title} updated={data.updated} />
	);
};

const localUserData = getLocalData("userData");

export const MindMap = () => {
	const { isLoading, data } = useGetQuery(
		"student/mindmaps",
		`student/mindmaps/${localUserData.userInfo.id}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(data);

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
					<img src="/image/basic/mindmap.png" width={"50%"} alt="" />
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h3" sx={{ textAlign: "center" }}>
						Create Mind Map
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Link href={"/student/mindmap/board/" + localUserData.userInfo.id}>
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

			<Paper
				elevation={3}
				sx={{
					pt: 2,
					pb: 5,
					mt: 12,
					mb: 6,
					backgroundColor: "#fafafa",
					borderRadius: "48px 48px 0px 0px",
				}}>
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
					{data.mindmaps.length ? (
						<Box
							component={"div"}
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								py: 3,
							}}>
							{data.mindmaps.map(getContents)}
						</Box>
					) : (
						<NotAvailable contentType="mindmap content" />
					)}
				</Box>
			</Paper>
		</>
	);
};
