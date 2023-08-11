import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, CircularProgress, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useQueryClient } from "react-query";
import { useGetQuery } from "../../../hooks/useGetQuery";
import { useGraphQuery } from "../../../hooks/useGraphQuery";
import { useStatus } from "../../../hooks/useStatus";
import { Loading } from "../../../pages/Loading";
import { apiGetDataHandler } from "../../../services/apiManager";
import { contentsQuery } from "../../../utilities/graphqlQueries";
import {
	getHeader,
	getLocalData,
	headerType,
} from "../../../utilities/utility";
import Main from "./Main";
import Sidebar from "./Sidebar";

const sidebar = {
	title: "About Writer",
	social: [
		{ name: "GitHub", icon: GitHubIcon },
		{ name: "Twitter", icon: TwitterIcon },
		{ name: "Facebook", icon: FacebookIcon },
	],
};

const localUserData = getLocalData("userData");

export const ContentLayout = ({ content }) => {
	const queryClient = useQueryClient();
	const { isLoading, data } = useGraphQuery(
		"contents-list",
		contentsQuery(content.subjectRef.sys.id)
	);
	const { data: requested } = useGetQuery(
		"feynman/requestCheck",
		"student/feynman/requestCheck",
		getHeader(headerType.tokenize, localUserData.token),
		{
			content_id: content.sys.id,
			user_id: localUserData.userInfo.id,
		}
	);

	const contents = data ? data.data.contentCollection.items : null;
	const { snack, setSnack, setLoading, loading } = useStatus();
	console.log(requested, content.sys.id);

	if (isLoading) return <Loading />;

	return (
		<>
			<Container maxWidth="lg">
				<main>
					<Grid
						container
						spacing={5}
						sx={{ mt: 3, mb: 3 }}
						justifyContent={"space-between"}>
						<Grid item xs={8} px={2}>
							<Paper elevation={3}>
								<img
									className="image--rounded image--full"
									src={content.image.url}
									alt="my foot"
									width="100%"
								/>
							</Paper>
							<Main content={content} />
							<Button
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								disabled={loading || requested?.found}
								onClick={() => {
									setLoading(true);
									apiGetDataHandler(
										"student/feynman/request",
										getHeader(headerType.tokenize, localUserData.token),
										{
											content_id: content.sys.id,
											user_id: localUserData.userInfo.id,
										}
									).then((res) => {
										setLoading(false);
										queryClient.invalidateQueries("feynman/requestCheck");
										console.log(res);
									});
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
						</Grid>
						<Grid item xs={4}>
							<Sidebar
								title={content.title}
								social={sidebar.social}
								contents={contents}
							/>
						</Grid>
					</Grid>
				</main>
			</Container>
		</>
	);
};
