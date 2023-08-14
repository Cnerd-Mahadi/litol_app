import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useMutateQuery } from "src/hooks/useMutateQuery";
import { signInSchema } from "src/validations";
import { InputField } from "../InputField";
import { InputFieldPassword } from "../InputFieldPassword";

export const SignInForm = () => {
	const navigate = useNavigate();
	const {
		isLoading,
		mutate,
		data: response,
	} = useMutateQuery("login", "login");

	console.log(response);

	const { handleSubmit, control } = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		try {
			mutate(data);
		} catch (error) {
			console.log(error);
		}
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
			<FormHelperText error={true} sx={{ textAlign: "center" }}>
				Invalid username or password
			</FormHelperText>
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
					<Link href="/signup" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};
