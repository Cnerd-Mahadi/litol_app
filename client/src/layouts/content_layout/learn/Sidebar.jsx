import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Sidebar(props) {
	const { social, title, contents } = props;

	console.log(contents);

	return (
		<Grid item xs={12}>
			<Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
				<Typography variant="h6" gutterBottom>
					Tip Corner
				</Typography>
				<Typography>
					To find mentoring online from other user on this topic try the request
					feyman button below the topic. Feyman request helps you to start a
					request for following topic where other user can mentor you on this
					topic over a feyman session when they accept it.
				</Typography>
			</Paper>
			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				Browse Contents
			</Typography>
			{contents.length > 0 &&
				contents.map((content) => (
					<Link
						href={`/student/learn/topic/${content.sys.id}`}
						underline="none"
						display="block"
						variant="body1"
						key={content.sys.id}>
						{content.title}
					</Link>
				))}
		</Grid>
	);
}

export default Sidebar;
