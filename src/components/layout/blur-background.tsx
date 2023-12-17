import { Stack } from "@mui/material";
import { Logo } from "./partials/SideBar/Logo";

export const BlurBackground = () => {
	return (
		<Stack
			sx={{
				height: "100%",
				filter: "blur(10px)",
				opacity: 0.5,
				display: {
					xs: "none",
					sm: "none",
					md: "flex",
				},
			}}>
			<Logo
				fontSize="14.6rem"
				sx={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%,-50%)",
				}}
			/>
		</Stack>
	);
};
