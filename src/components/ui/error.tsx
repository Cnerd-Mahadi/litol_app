import { Box, Button, Stack } from "@mui/material";
import { colors } from "src/utils";

export const Error = () => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			bgcolor={colors.white}
			sx={{
				minHeight: "100vh",
			}}>
			<Box component="img" src="/not_found.png" width="40%"></Box>
			<Button href="/" variant="contained">
				Back Home
			</Button>
		</Stack>
	);
};
