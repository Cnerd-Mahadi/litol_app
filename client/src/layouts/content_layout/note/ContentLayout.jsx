import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Main from "./Main";
import Sidebar from "./Sidebar";

const sidebar = {
	title: "Cue Notes",
	description:
		"Cornell section is inspired by cornell note taking method where the lesson can be remembered or structured using key and details",
	social: [
		{ name: "GitHub", icon: GitHubIcon },
		{ name: "Twitter", icon: TwitterIcon },
		{ name: "Facebook", icon: FacebookIcon },
	],
};

export const ContentLayout = ({ content, contents }) => {
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
							<Main content={content} />
						</Grid>
						<Grid item xs={4}>
							<Sidebar
								title={sidebar.title}
								description={sidebar.description}
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
