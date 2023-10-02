import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { borderStyle } from "src/styles/components/Layouts";
import { localUserData } from "src/utils";

export const ProfileCard = () => {
	const theme = useTheme();
	console.log(localUserData());
	return (
		<Stack
			padding="1.5rem 1.5rem"
			spacing={4}
			sx={{
				...borderStyle(theme),
			}}>
			<Stack direction={"row"} spacing={2} alignItems={"center"}>
				<Avatar
					src={localUserData().image}
					sx={{
						width: "95px",
						height: "95px",
					}}
				/>
				<Stack>
					<Typography
						variant="h3"
						lineHeight={1.9}
						pb={1}
						color={theme.palette.primary.main}>
						Greetings,
					</Typography>
					<Typography variant="h4" color={theme.palette.primary.main}>
						{localUserData().name}
					</Typography>
				</Stack>
			</Stack>
			<Typography color={theme.palette.text.secondary}>
				“Every child is an artist; the problem is staying an artist when you
				grow up” <br /> <br />– Pablo Picasso
			</Typography>
		</Stack>
	);
};
