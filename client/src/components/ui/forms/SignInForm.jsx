import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useMutateQuery } from "src/hooks/useMutateQuery";
import { setLocalData } from "src/utils";
import { signInSchema } from "src/validations";
import { InputField } from "../InputField";
import { InputFieldPassword } from "../InputFieldPassword";
import { Link } from "../Link";

export const SignInForm = () => {
	const navigate = useNavigate();
	const { isLoading, mutate, error } = useMutateQuery("login", "login");
	const unAuthorized = error?.response?.status === 401;

	const { handleSubmit, control } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = async (data) => {
		console.log(data);
		mutate(data, {
			onSuccess: (response) => {
				setLocalData("userData", response.data);
				navigate("/student");
			},
		});
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			marginTop={1}
			marginX={3}>
			<Grid container spacing={4} justifyContent={"center"} marginBottom={1}>
				<Grid item xs={12}>
					<InputField
						id="username"
						control={control}
						label={"Username"}
						fullWidth
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<InputFieldPassword
						id="password"
						control={control}
						label={"Password"}
					/>
				</Grid>
			</Grid>
			{unAuthorized && (
				<FormHelperText error={true} sx={{ textAlign: "center" }}>
					{error?.response?.data?.message}
				</FormHelperText>
			)}
			<Button
				disabled={isLoading}
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
					<Link to="/signup" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};
