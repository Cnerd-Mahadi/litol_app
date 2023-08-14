import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SignInForm } from "src/components/ui/forms/SignInForm";
import { signInImage } from "src/utils";

const image = {
	backgroundImage: `url(${signInImage})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
	height: "640px",
};

const container = {
	marginTop: 8,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

export const SignIn = () => {
	return (
		<Grid container component="main">
			<Grid item xs={false} md={6} lg={7} sx={image} />
			<Grid item xs={12} md={6} lg={5} component={Paper} elevation={6}>
				<Box sx={container}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<SignInForm />
				</Box>
			</Grid>
		</Grid>
	);
};
