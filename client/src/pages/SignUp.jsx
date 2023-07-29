import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Button, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { InputField } from "../components/input-fields/InputField";
import { InputFieldPassword } from "../components/input-fields/InputFieldPassword";
import { SelectField } from "../components/input-fields/SelectField";
import { SignUpServices } from "../services/SignUpServices";
import { SignUpContainerStyle } from "../styles/mui-styles/containers";
import { genderOptions } from "../utilities/utility";

export const SignUp = () => {
	const { control, handleSubmit, onSubmit } = SignUpServices();

	return (
		<Container component="div" maxWidth="xs">
			<Box sx={SignUpContainerStyle}>
				<Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
					<LockOutlinedIcon fontSize="large" />
				</Avatar>

				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3 }}>
					<Grid container spacing={2} sx={{ justifyContent: "center" }}>
						<Grid item xs={12} sm={6}>
							<InputField
								type="text"
								id="username"
								label={"Username"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputFieldPassword
								id="password"
								label={"Password"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<SelectField
								id="gender"
								label={"Gender"}
								control={control}
								menu={genderOptions}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputField
								type="date"
								id="dob"
								label={"Date of Birth"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12}>
							<InputField
								type="email"
								id="email"
								label={"Email address"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12}>
							<InputField
								type="text"
								id="phone"
								label={"Phone number"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12}>
							<InputField
								type="text"
								id="address"
								label={"Address"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
						</Grid>
					</Grid>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
