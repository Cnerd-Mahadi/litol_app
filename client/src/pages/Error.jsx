import { Box, Button, Typography } from "@mui/material";

const style = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	minHeight: "100vh",
	backgroundColor: "#041C32",
};

export const Error = () => {
	return (
		<Box sx={style}>
			<Typography variant="h1" style={{ color: "white" }}>
				404
			</Typography>
			<Typography variant="h6" style={{ color: "white" }}>
				{`The page you're looking for doesn't exist.`}
			</Typography>
			<Button href="/" variant="contained">
				Back Home
			</Button>
		</Box>
	);
};
