import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = ({ ...props }) => {
	return (
		<Stack alignItems="center" justifyContent="center">
			<CircularProgress {...props} />
		</Stack>
	);
};
