import { Box, Stack, Typography, useTheme } from "@mui/material";
import { About } from "src/components/layouts/Dashboard/About";
import { FeatureItem } from "src/components/layouts/Dashboard/FeatureItem";
import { ProfileCard } from "src/components/layouts/Dashboard/ProfileCard";
import { StatCard } from "src/components/layouts/Dashboard/StatCard";
import { useGetQuery } from "src/hooks/useGetQuery";
import { borderStyle, roundedImage } from "src/styles/components/Layouts";
import { localUserData } from "src/utils";
import { features, images } from "src/utils/resources";

export const StudentDash = () => {
	const theme = useTheme();
	const { isLoading, data: response } = useGetQuery(
		"student/dashboard",
		`student/dashboard`,
		{
			user_id: localUserData().uid,
		}
	);
	const statInfo = response?.data;
	console.log(statInfo);
	return (
		<Stack spacing={3} p={2}>
			<Stack direction={"row"} spacing={2} width="100%">
				<Box
					component="img"
					src={images.studentDash}
					width="70%"
					minHeight={350}
					sx={{
						...roundedImage,
					}}
				/>
				<ProfileCard />
			</Stack>
			<StatCard info={statInfo} loading={isLoading} />
			<About />
			<Stack
				alignItems="center"
				spacing={6}
				sx={{
					...borderStyle(theme),
					px: 2,
					pt: 5,
					pb: 10,
				}}>
				<Typography
					variant="h2"
					color={theme.palette.primary.main}
					textAlign="center">
					Key Features
				</Typography>
				<FeatureItem
					direction="row"
					feature={features.learn}
					image={images.learn}
				/>
				<FeatureItem
					direction="row-reverse"
					feature={features.summary}
					image={images.summary}
				/>
				<FeatureItem
					direction="row"
					feature={features.note}
					image={images.note}
				/>
				<FeatureItem
					direction="row-reverse"
					feature={features.mindmap}
					image={images.mindmap}
				/>
				<FeatureItem
					direction="row"
					feature={features.feynman}
					image={images.feynman}
				/>
			</Stack>
		</Stack>
	);
};
