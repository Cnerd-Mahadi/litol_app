"use client";

import lock from "@/../public/assets/lock.png";
import signin from "@/../public/assets/test.png";
import { Logo } from "@/components/layout/partials/sidebar/logo";
import { signIn } from "@/libs/auth";

import { Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SignIn = () => {
	const router = useRouter();

	const handleSignIn = async () => {
		const result = await signIn();
		return result ? router.push("/bandorBan") : null;
	};

	return (
		<>
			<Container
				maxWidth={"xs"}
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					height: 450,
				}}>
				<Stack
					spacing={3}
					height={"100%"}
					paddingTop={4}
					paddingBottom={4}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Stack alignItems="center">
						<Logo />
						<Image src={lock} alt="lock-icon" width={25} />
					</Stack>
					<Stack alignItems="center">
						<Image src={signin} alt="signin" width={300} />
					</Stack>
					<Stack spacing={2.5} alignItems={"center"}>
						<Button
							variant="contained"
							sx={{
								gap: 2,
							}}
							onClick={handleSignIn}>
							<Image
								src={"/assets/google.png"}
								width={20}
								height={20}
								alt="google-icon"
							/>
							<Typography variant="h6">Sign In With Google</Typography>
						</Button>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};
