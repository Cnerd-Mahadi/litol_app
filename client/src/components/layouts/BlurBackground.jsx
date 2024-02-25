import { Stack } from "@mui/material";
import { Logo } from "./partials/SideBar/Logo";

const bigText = "14.6rem";
export const BlurBackground = () => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={{
				height: "100vh",
				width: "100vw",
				filter: "blur(6px)",
				opacity: 0.5,
				pr: 95,
			}}>
			<Logo fontSize={bigText} />
		</Stack>
	);
};
