import { Button, Chip, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "swiper/css";
import "swiper/css/pagination";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const getContents = (item) => {
	return (
		<Paper
			key={item.details.feynman_id}
			elevation={3}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				gap: 2,
				px: 4,
				py: 2,
				my: 3,
				width: "100%",
				backgroundColor: "#fafafa",
				borderRadius: "24px",
			}}>
			<Typography
				variant="h6"
				sx={{
					textAlign: "center",
					alignSelf: "center",
					fontWeight: 700,
				}}>
				{item.details.content.title}
			</Typography>
			<Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 500 }}>
				Subject: {item.details.subject.subject_name.toUpperCase()}
			</Typography>
			<Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 500 }}>
				Requested by:
				{item.slotA && (
					<Chip
						sx={{
							mx: 1,
						}}
						label={item.slotA.username}
						color="primary"
						variant="outlined"></Chip>
				)}
				{item.slotB && (
					<Chip
						sx={{
							mr: 1,
						}}
						label={item.slotB.username}
						color="primary"
						variant="outlined"></Chip>
				)}
				{item.slotC && (
					<Chip
						sx={{
							mr: 1,
						}}
						label={item.slotC.username}
						color="primary"
						variant="outlined"></Chip>
				)}
				{item.slotD && (
					<Chip
						sx={{
							mr: 1,
						}}
						label={item.slotD.username}
						color="primary"
						variant="outlined"></Chip>
				)}
			</Typography>
			<Button variant="contained">Resolve</Button>
		</Paper>
	);
};

const localUserData = getLocalData("userData");

export const Feynman = () => {
	const { isLoading, data } = useGetQuery(
		"student/feynmen",
		`student/feynmen`,
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
					<img src="/image/basic/feynman.png" width={"200px"} alt="" />
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 700,
							textAlign: "center",
							mb: 3,
						}}>
						Feyman Gallery
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{data.map((item) => getContents(item))}
				</Grid>
			</Grid>
		</>
	);
};
