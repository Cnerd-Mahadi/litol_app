import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SignUpForm } from "src/components/ui/forms/SignUpForm";

const container = {
	marginTop: 8,
	marginBottom: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

export const SignUp = () => {
	return (
		<Container component="div" maxWidth="xs">
			<Box sx={container}>
				<Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
					<LockOutlinedIcon fontSize="large" />
				</Avatar>

				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<SignUpForm />
			</Box>
		</Container>
	);
};
