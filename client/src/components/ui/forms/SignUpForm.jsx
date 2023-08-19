import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useMutateQuery } from "src/hooks/useMutateQuery";
import { useSnack } from "src/hooks/useSnack";
import { setLocalData } from "src/utils";
import { signUpSchema } from "src/validations";
import { InputField } from "../InputField";
import { InputFieldPassword } from "../InputFieldPassword";
import { Link } from "../Link";
import { ProgressButton } from "../ProgressButton";
import SnackAlert from "../SnackAlert";

export const SignUpForm = () => {
	const navigate = useNavigate();
	const { snack, setSnack } = useSnack();
	const { isLoading, mutate } = useMutateQuery("signUp", "signUp");

	const { handleSubmit, control } = useForm({
		defaultValues: {
			username: "",
			dob: "2022-04-17",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(signUpSchema),
	});

	console.log(" DATA");
	const onSubmit = async (data) => {
		console.log(" GORILLA");
		const formData = {
			...data,
			dob: data.dob.toDateString(),
		};
		console.log(formData);
		mutate(formData, {
			onSuccess: (response) => {
				setLocalData("userData", response.data);
				setSnack((prev) => ({
					...prev,
					open: true,
					status: "success",
					title: "Success",
					message: "User created successfully!",
				}));
				setTimeout(() => navigate("/student"), 1900);
			},
			onError: (error) => {
				console.log(error);
				setSnack((prev) => ({
					...prev,
					open: true,
					status: "error",
					title: "Failed",
					message: "Something went wrong! Please try again.",
				}));
			},
		});
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{ mt: 3 }}>
			<Grid container spacing={3} sx={{ justifyContent: "center" }}>
				<Grid item xs={12} sm={6}>
					<InputField
						id="username"
						control={control}
						label={"Username"}
						fullWidth
						autoFocus
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<InputField
						id="dob"
						control={control}
						type="date"
						label={"Date of Birth"}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<InputFieldPassword
						id="password"
						label={"Password"}
						control={control}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<InputFieldPassword
						id="confirmPassword"
						label={"Confirm Password"}
						control={control}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
					<InputField
						id="email"
						control={control}
						type="email"
						label={"Email address"}
						fullWidth
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
					<ProgressButton loading={isLoading} text={"Sign Up"} />
				</Grid>
			</Grid>

			<Grid container justifyContent="flex-end">
				<Grid item>
					<Link to="/" variant="body2">
						Already have an account? Sign in
					</Link>
				</Grid>
			</Grid>
			<SnackAlert
				open={snack.open}
				status={snack.status}
				message={snack.message}
				title={snack.title}
				exit={snack.exit}
				setSnack={setSnack}
			/>
		</Box>
	);
};
