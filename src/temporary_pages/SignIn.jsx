import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlurBackground } from "src/components/layouts/BlurBackground";
import { Logo } from "src/components/layouts/partials/SideBar/Logo";
import { signIn } from "src/services/firebase/googleSignIn";
import { borderStyle } from "src/styles/components/Layouts";
import { colors, colors as myColors } from "src/utils";

export const SignIn = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<>
			<BlurBackground />
			<Stack
				spacing={3}
				sx={{
					...borderStyle(theme),
					backgroundColor: colors.white,
					width: "25rem",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					padding: "1.5rem 4rem 4rem 4rem",
				}}>
				<Stack alignItems="center">
					<Box component={"img"} pr={1} pb={1} src="/lock.png" width={45} />
					<Logo fontSize="2.1rem" />
				</Stack>
				<Stack alignItems="center">
					<Box
						component={"img"}
						pb={1}
						textAlign="center"
						src="/test.png"
						width={250}
					/>
				</Stack>
				<Typography
					variant="h4"
					textAlign={"center"}
					color={myColors.text_main}>
					Welcome,
				</Typography>
				<Stack spacing={2.5}>
					<Button
						variant="outlined"
						sx={{
							padding: "0.6rem 0.35rem",
							borderRadius: "0.5rem",
							textTransform: "uppercase",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: "0.7rem",
						}}
						onClick={() => {
							signIn(navigate);
						}}>
						<Box
							component={"img"}
							src="/google.png"
							width={27}
							p={0.5}
							sx={{
								borderRadius: "50%",
								backgroundColor: "white",
							}}
						/>
						<Typography variant="h6">Sign In With Google</Typography>
					</Button>
				</Stack>
			</Stack>
		</>
	);
};
