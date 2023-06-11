import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Switch,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../components/common/InputField";
import { InputFieldPassword } from "../components/common/InputFieldPassword";
import { handleSignUp } from "../services/userManager";
import { SignUpContainerStyle } from "../styles/mui-styles/containers";

export const SignUp = () => {
	const navigate = useNavigate();
	const [isCreator, setIsCreator] = useState(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const resultData = {
			username: data.get("name"),
			age: data.get("age"),
			dob: data.get("date"),
			gender: data.get("gender"),
			email: data.get("email"),
			password: data.get("password"),
			address: data.get("address"),
			bio: data.get("bio"),
			phone: data.get("phone"),
			emailCheck: data.get("emailCheck"),
		};
		console.log(resultData, "FormData");

		const url = isCreator ? "creator/signup" : "student/signUp";

		handleSignUp(url, resultData, navigate);
	};

	return (
		<Container component="div" maxWidth="xs">
			<Box sx={SignUpContainerStyle}>
				<Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
					<LockOutlinedIcon fontSize="large" />
				</Avatar>

				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2} sx={{ justifyContent: "center" }}>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Switch
										checked={isCreator}
										onChange={() => setIsCreator(!isCreator)}
									/>
								}
								label="As a Creator"
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputField id="name" type={"text"} autoFocus={true} />
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputField type={"number"} id="age" />
						</Grid>

						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel id="genderLabel">Gender</InputLabel>
								<Select
									id="gender"
									defaultValue="male"
									label="Gender"
									name="gender">
									<MenuItem value={"male"}>Male</MenuItem>
									<MenuItem value={"female"}>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<TextField
								id="date"
								label="Birthday"
								type="date"
								defaultValue="2017-05-24"
								fullWidth
								name="date"
							/>
						</Grid>

						<Grid item xs={12}>
							<InputField type={"email"} id="email" />
						</Grid>

						<Grid item xs={12}>
							<InputFieldPassword id="password" />
						</Grid>

						{!isCreator ? (
							<Grid item xs={12}>
								<InputField type={"address"} id="address" />
							</Grid>
						) : (
							<Grid item xs={12}>
								<InputField type={"text"} id="bio" />
							</Grid>
						)}

						<Grid item xs={12}>
							<InputField type={"phone"} id="phone" />
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
