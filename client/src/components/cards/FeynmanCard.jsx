import { Button, Chip, Paper, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useContext } from "react";
import { FeynmanContext } from "src/contexts/FeynmanProvider";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { contentFeymanQuery } from "src/utils/graphqlQueries";

const paper = {
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
};

export const FeynmanCard = ({ id, data }) => {
	const feynmanContext = useContext(FeynmanContext);
	console.log(feynmanContext);
	const { isLoading, data: content } = useGraphQuery(
		["feynItems", id],
		contentFeymanQuery(data.contentId)
	);

	return (
		!isLoading && (
			<Paper elevation={3} sx={paper}>
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
						feynmanContext.setInvitation({
							open: true,
							info: {
								contentData: content.data.content,
								id: id,
							},
						});
					}}>
					Resolve
				</Button>
			</Paper>
		)
	);
};

FeynmanCard.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};
