import { Button, Chip, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { useQuery } from "react-query";
import { FeynmanContext } from "../../services/FeymanServices";
import { contentFeymanQuery, requestUrl } from "../../utilities/graphqlQueries";

export const FeynmanCard = ({ id, data }) => {
	const feynmanContext = useContext(FeynmanContext);
	const { isLoading, data: content } = useQuery(["feynItems", id], async () => {
		return fetch(requestUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer DC4u9BY4yugEYxmzEadoAdHbFfk6GawAZXwf6uT8llo",
			},
			body: JSON.stringify({
				query: contentFeymanQuery(data.contentId),
			}),
		}).then((res) => res.json());
	});

	return (
		!isLoading && (
			<Paper
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
					{content.data.content.title}
				</Typography>
				<Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 500 }}>
					Subject: {content.data.content.subjectRef.name.toUpperCase()}
				</Typography>
				<Typography variant="h5" sx={{ fontSize: "16px", fontWeight: 500 }}>
					Requested by:
					{data.slots.A && (
						<Chip
							sx={{
								mx: 1,
							}}
							label={data.slots.A.username}
							color="primary"
							variant="outlined"></Chip>
					)}
					{data.slots.B && (
						<Chip
							sx={{
								mx: 1,
							}}
							label={data.slots.B.username}
							color="primary"
							variant="outlined"></Chip>
					)}
					{data.slots.C && (
						<Chip
							sx={{
								mx: 1,
							}}
							label={data.slots.C.username}
							color="primary"
							variant="outlined"></Chip>
					)}
					{data.slots.D && (
						<Chip
							sx={{
								mx: 1,
							}}
							label={data.slots.D.username}
							color="primary"
							variant="outlined"></Chip>
					)}
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						feynmanContext.setContentInfo({
							contentData: content.data.content,
							id: id,
						});
						feynmanContext.setOverlay(true);
					}}>
					Resolve
				</Button>
			</Paper>
		)
	);
};
