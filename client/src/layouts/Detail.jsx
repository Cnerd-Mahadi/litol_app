import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";

const sidebar = {
	title: "About Writer",
	description: "",
	social: [
		{ name: "GitHub", icon: GitHubIcon },
		{ name: "Twitter", icon: TwitterIcon },
		{ name: "Facebook", icon: FacebookIcon },
	],
};

export const Detail = ({ content, contents, role }) => {
	if (role === "STUDENT") {
		sidebar.description = `Hello, I am ${content.student.user.username}. My Age is ${content.student.age}. Currently living in ${content.student.address}`;
	} else {
		sidebar.description = JSON.parse(localStorage.getItem("userData")).user.bio;
	}

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
							<img
								className="image--rounded image--fit"
								src={require(`../../../server/storage/app/public/${
									role === "STUDENT" ? "summary" : "content"
								}/${content.image}`)}
								alt="my foot"
								width="100%"
								height="520px"
							/>
							<Main content={content} role={role} />
						</Grid>
						<Grid item xs={4}>
							<Sidebar
								title={sidebar.title}
								description={sidebar.description}
								social={sidebar.social}
								contents={contents}
								role={role}
							/>
						</Grid>
					</Grid>
				</main>
			</Container>
		</>
	);
};
