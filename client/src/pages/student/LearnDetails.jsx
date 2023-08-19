import { useParams } from "react-router-dom";

import {
	Button,
	CircularProgress,
	Container,
	Grid,
	Paper,
} from "@mui/material";
import Image from "mui-image";
import { useMutation, useQuery } from "react-query";
import { Loading } from "src/components/layouts/Loading";
import Sidebar from "src/components/layouts/Sidebar";
import Main from "src/components/layouts/learn/Main";
import { Link } from "src/components/ui/Link";
import SnackAlert from "src/components/ui/SnackAlert";
import { useAxios } from "src/hooks/useAxios";
import { useGetQuery } from "src/hooks/useGetQuery";
import { useGraphQuery } from "src/hooks/useGraphQuery";
import { useSnack } from "src/hooks/useSnack";
import { localUserData, queryClient } from "src/utils";
import {
	contentQuery,
	contentsQuery,
	requestUrl,
} from "src/utils/graphqlQueries";
import { sidebarInfo } from "src/utils/resources";

export const LearnDetails = () => {
	const { topicId } = useParams();
	const { snack, setSnack } = useSnack();
	const axios = useAxios();

	const { isLoading, data } = useGraphQuery("content", contentQuery(topicId));
	const content = data ? data.data.content : null;

	const { data: collection } = useQuery(
		["contents-list", content?.subjectRef.sys.id],
		async () => {
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
		"feynman/requestCheck",
		"student/feynman/requestCheck",
		{
			content_id: topicId,
			user_id: localUserData.userInfo.id,
		}
	);

	const { isLoading: loading, mutate } = useMutation({
		mutationKey: ["feynman/request"],
		mutationFn: (params) =>
			axios.get("student/feynman/request", {
				params: params,
			}),
	});

	if (isLoading) return <Loading />;

	return (
		<Container maxWidth="lg">
			<Grid
				container
				spacing={5}
				sx={{ mt: 3, mb: 3 }}
				justifyContent={"space-between"}>
				<Grid item xs={8} px={2}>
					<Paper elevation={3}>
						<Image src={content.image.url} alt="display image" width="100%" />
					</Paper>
					<Main content={content} />
					<Button
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading || requested?.data?.found}
						onClick={() => {
							mutate(
								{
									content_id: topicId,
									user_id: localUserData.userInfo.id,
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
							<CircularProgress size={"1rem"} sx={{ ml: 1 }} color="inherit" />
						)}
					</Button>
				</Grid>
				<Grid item xs={4}>
					<Sidebar tldr={sidebarInfo.learn.tldr} type={sidebarInfo.learn.type}>
						{contents &&
							contents.map((content) => (
								<Link
									to={`/student/learn/topic/${content.sys.id}`}
									underline="none"
									display="block"
									key={content.sys.id}>
									{content.title}
								</Link>
							))}
					</Sidebar>
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
		</Container>
	);
};
