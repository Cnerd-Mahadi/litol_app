import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
	p: 4,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const Loading = () => {
	return (
		<Box sx={style}>
			<CircularProgress />
		</Box>
	);
};
