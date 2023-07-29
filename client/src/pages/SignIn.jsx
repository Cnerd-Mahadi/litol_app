import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CopyRight } from "../components/common/CopyRight";
import { InputField } from "../components/input-fields/InputField";
import { InputFieldPassword } from "../components/input-fields/InputFieldPassword";
import { handleSignIn } from "../services/userManager";
import {
	SignInContainerStyle,
	SignInImageBoxStyle,
} from "../styles/mui-styles/containers";

const SignInCopy = () => {
	return (
		<>
			{"Copyright © "}
			<Link
				color="inherit"
				href="#"
				sx={{
					":hover": {
						color: "primary.main",
					},
				}}>
				Team ETERNALS
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</>
	);
};

export const SignIn = () => {
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const result = {
			username: data.get("username"),
			password: data.get("password"),
		};

		console.log(result, "FormData");
		handleSignIn("login", result, navigate);
	};

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
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}>
						<InputField
							id="username"
							type={"text"}
							margin={"normal"}
							autoComplete="username"
							autoFocus={true}
						/>
						<InputFieldPassword id="password" margin={"normal"} />
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>

						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>

						<CopyRight sx={{ mt: 5 }}>
							<SignInCopy />
						</CopyRight>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
