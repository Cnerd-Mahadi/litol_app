import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import { ProgressButton } from "../components/common/ProgressButton";
import { SnackAlert } from "../components/common/SnackAlert";
import { InputField } from "../components/input-fields/InputField";
import { InputFieldPassword } from "../components/input-fields/InputFieldPassword";
import { SignUpServices } from "../services/SignUpServices";
import { SignUpContainerStyle } from "../styles/mui-styles/containers";

export const SignUp = () => {
	const {
		control,
		handleSubmit,
		onSubmit,
		loading,
		snack: { open, message, severity },
		setSnack,
	} = SignUpServices();

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
					<Grid container spacing={3} sx={{ justifyContent: "center" }}>
						<Grid item xs={12} sm={6}>
							<Controller
								name={"username"}
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										fullWidth
										id={"username"}
										label={"Username"}
										type={"text"}
										onChange={(e) => {
											field.onChange(e);
										}}
										onBlur={field.onBlur}
										value={field.value}
										error={fieldState.error ? true : false}
										helperText={fieldState.error?.message}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputFieldPassword
								id="password"
								label={"Password"}
								control={control}
							/>
						</Grid>

						<Grid item xs={12}>
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
						<Grid
							item
							xs={12}
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<ProgressButton loading={loading} text={"Sign Up"} />
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
			<SnackAlert
				open={open}
				severity={severity}
				message={message}
				handleSnack={setSnack}
			/>
		</Container>
	);
};

/// Later Exploration throttle, debounce code

// useEffect(() => {
// 	const fetchUnique = async (value) => {
// 		const result = await debouncedCheckUniqueness(
// 			"student/usernameCheck",
// 			getHeader(headerType.nodata),
// 			{
// 				username: value,
// 			}
// 		);
// 		console.log(result, "BORIBALEIDCNZD");
// 		result || result === undefined
// 			? setUniqueError((prev) => {
// 					return {
// 						message: prev.message + 1,
// 						error: false,
// 					};
// 			  })
// 			: setUniqueError((prev) => {
// 					return {
// 						message: prev.message + 1,
// 						error: true,
// 					};
// 			  });
// 	};

// 	fetchUnique(username);
// }, [username]);
