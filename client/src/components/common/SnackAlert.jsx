import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackAlert = ({ open, message, severity, handleSnack }) => {
	console.log(handleSnack);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		handleSnack({ open: false, message: "", severity: severity });
	};

	return (
		<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};
