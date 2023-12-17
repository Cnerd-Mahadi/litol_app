import { useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	Grid,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import Main from "src/components/layouts/Learn/Main";
import { BreadCrumbs } from "src/components/ui/BreadCrumbs";
import { Link } from "src/components/ui/Link";
import { Loading } from "src/components/ui/Loading";
import SnackAlert from "src/components/ui/SnackAlert";
import { HorizontalImageCard } from "src/components/ui/horizontal_cards/HorizontalImageCard";
import { useGetQuery } from "src/hooks/useGetQuery";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { useSnack } from "src/hooks/useSnack";
import { Axios } from "src/services/Axios";
import { colors, localUserData, queryClient } from "src/utils";
import {
	contentQuery,
	contentsQuery,
	requestUrl,
} from "src/utils/graphqlQueries";

export const LearnDetails = () => {
	const { topicId } = useParams();
	const { snack, setSnack } = useSnack();
	const theme = useTheme();

	const { isLoading, data } = useGraphQuery(
		["content", topicId],
		contentQuery(topicId)
	);
	const content = data ? data.data.content : null;

	const breadcrumbs = [
		<Link key="1" to="/student/learn">
			<Typography variant="h5" color={colors.text}>
				Learn
			</Typography>
		</Link>,
		<Link key="2" to={`/student/learn/subject/${content?.subjectRef.sys.id}`}>
			<Typography variant="h5" color={colors.text}>
				Topic
			</Typography>
		</Link>,
		<Typography key="3" variant="h5" color={colors.text_light}>
			Details
		</Typography>,
	];

	const { data: collection } = useQuery(
		["contents-list", content?.subjectRef.sys.id],
		async () => {
			const axios = await Axios();
			const response = await axios.post(
				requestUrl,
				{ query: contentsQuery(content.subjectRef.sys.id) },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer DC4u9BY4yugEYxmzEadoAdHbFfk6GawAZXwf6uT8llo",
					},
				}
			);
			return response.data;
		},
		{
			enabled: !!content,
		}
	);
	const contents = collection ? collection.data.contentCollection.items : null;

	const { data: requested } = useGetQuery(
		["feynman/requestCheck", topicId, "6ff59a16d0df455b8e35"],
		"student/feynman/requestCheck",
		{
			content_id: topicId,
			user_id: localUserData().uid,
		}
	);

	const { isLoading: loading, mutate } = useMutation({
		mutationKey: ["feynman/request"],
		mutationFn: async (params) => {
			const axios = await Axios();
			return await axios.get("student/feynman/request", {
				params: params,
			});
		},
	});

	if (isLoading) return <Loading sx={{ my: 4 }} />;

	return (
		<Box py={3}>
			<Grid container justifyContent={"space-between"}>
				<Grid item xs={8.5} px={5}>
					<BreadCrumbs
						breadcrumbs={breadcrumbs}
						title="Details"
						sx={{
							px: 2,
							mb: 2,
						}}
					/>
					<Stack alignItems={"center"}>
						<Main content={content} />
						<Button
							variant="outlined"
							sx={{ mt: 3, mb: 2, borderRadius: 12 }}
							disabled={loading || requested?.data?.found}
							onClick={() => {
								mutate(
									{
										content_id: topicId,
										user_id: localUserData().uid,
										name: localUserData().name,
										email: localUserData().email,
										image: localUserData().image,
									},
									{
										onSuccess: () => {
											queryClient.invalidateQueries("feynman/requestCheck");
											setSnack((prev) => ({
												...prev,
												open: true,
												status: "success",
												title: "Success",
												message: "Feynman session requested successfully!",
											}));
										},
										onError: () => {
											setSnack((prev) => ({
												...prev,
												open: true,
												status: "error",
												title: "Failed",
												message: "Something went wrong! Please try again.",
											}));
										},
									}
								);
							}}>
							Feynman Request
							{loading && (
								<CircularProgress
									size={"1rem"}
									sx={{ ml: 1 }}
									color="inherit"
								/>
							)}
						</Button>
					</Stack>
				</Grid>
				<Grid
					item
					xs={3.5}
					sx={{
						borderLeft: `1px solid ${theme.palette.divider}`,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{contents && (
						<Stack alignItems={"stretch"} pt={3} px={2}>
							<Typography variant="h4" pb={5} textAlign={"center"}>
								See Recent Topics
							</Typography>
							<Stack alignItems={"stretch"} spacing={4}>
								{contents.map((content) => (
									<HorizontalImageCard
										key={content.sys.id}
										link={`/student/learn/topic/${content.sys.id}`}
										image={content.image.url}
										actionText={content.title}
										lightText={content.subjectRef.name}
									/>
								))}
							</Stack>
						</Stack>
					)}
				</Grid>
			</Grid>

			<SnackAlert
				open={snack.open}
				status={snack.status}
				message={snack.message}
				title={snack.title}
				exit={snack.exit}
				setSnack={setSnack}
			/>
		</Box>
	);
};
