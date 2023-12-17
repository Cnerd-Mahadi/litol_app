import {
	Avatar,
	Box,
	Button,
	Stack,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useContext } from "react";
import { FeynmanContext } from "src/contexts/FeynmanProvider";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { borderStyle, roundedImage } from "src/styles/components/Layouts";
import { colors } from "src/utils";
import { contentFeymanQuery } from "src/utils/graphqlQueries";

const slots = ["A", "B", "C", "D"];

export const FeynmanCard = ({ id, data }) => {
	const theme = useTheme();
	const feynmanContext = useContext(FeynmanContext);
	console.log(feynmanContext);
	const { isLoading, data: content } = useGraphQuery(
		["feynItems", id],
		contentFeymanQuery(data.contentId)
	);

	return (
		!isLoading && (
			<Stack
				direction="row"
				alignItems="start"
				bgcolor={colors.white}
				spacing={1}
				sx={{
					...borderStyle(theme),
					width: 530,
				}}>
				<Box
					component={"img"}
					src="/physics.jpg"
					height="100%"
					width={150}
					sx={{
						...roundedImage,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
					}}
				/>
				<Stack
					direction="row"
					justifyContent={"space-between"}
					alignItems="start"
					sx={{ width: "100%", p: 1.5 }}>
					<Stack spacing={0.25}>
						<Typography
							variant="h5"
							sx={{ pb: 0.5 }}
							color={theme.palette.text.primary}>
							{content.data.content.title}
						</Typography>
						<Stack>
							<Typography variant="subtitle2" color={colors.text_light}>
								{data.updated}
							</Typography>
							<Typography variant="subtitle2" color={colors.text_light}>
								{content.data.content.subjectRef.name}
							</Typography>
						</Stack>
						<Typography variant="subtitle2" pt={0.5} color={colors.text_light}>
							Requested by
							<Stack direction="row" spacing={-0.5} sx={{ pt: 0.9 }}>
								{slots.map((slot) => {
									return (
										data.slots[slot] && (
											<Box key={slot}>
												<Tooltip
													title={`${data.slots[slot].name} | ${data.slots[slot].email}`}
													arrow>
													<Avatar
														src={data.slots[slot].image}
														sx={{ width: 30, height: 30 }}
													/>
												</Tooltip>
											</Box>
										)
									);
								})}
							</Stack>
						</Typography>
					</Stack>
					<Button
						variant="outlined"
						sx={{
							px: 4,
						}}
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
				</Stack>
			</Stack>
		)
	);
};

FeynmanCard.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};
