import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: 2,
				height: "100vh",
			}}>
			<Typography variant="h4" gutterBottom color={"primary.main"}>
				Loading...Please Wait
			</Typography>
			<CircularProgress />
		</Box>
	);
};
