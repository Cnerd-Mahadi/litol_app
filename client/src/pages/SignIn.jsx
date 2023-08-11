import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormHelperText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { InputField } from "../components/input-fields/InputField";
import { InputFieldPassword } from "../components/input-fields/InputFieldPassword";
import { SignInServices } from "../services/SignInServices";
import {
	SignInContainerStyle,
	SignInImageBoxStyle,
} from "../styles/mui-styles/containers";

export const SignIn = () => {
	const { control, handleSubmit, onSubmit, loginErr } = SignInServices();

	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} sx={SignInImageBoxStyle} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box sx={SignInContainerStyle}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>

					<Typography component="h1" variant="h5">
						Sign in
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 1 }}>
						<Grid container spacing={4} sx={{ justifyContent: "center" }}>
							<Grid item xs={12}>
								<InputField
									type="text"
									id="username"
									label={"Username"}
									control={control}
								/>
							</Grid>
							<Grid item xs={12}>
								<InputFieldPassword
									id="password"
									label={"Password"}
									control={control}
								/>
							</Grid>
						</Grid>
						{loginErr && (
							<FormHelperText error={true}>
								Invalid username or password
							</FormHelperText>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 5, mb: 8 }}>
							Sign In
						</Button>

						<Grid container>
							<Grid
								item
								xs={12}
								sx={{
									textAlign: "end",
								}}>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
