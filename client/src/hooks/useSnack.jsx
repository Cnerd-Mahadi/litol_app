import { useState } from "react";

const initSnackContext = {
	open: false,
	exit: true,
	status: "success",
	title: "BC",
	message: "BC Ka reply",
};

export const useSnack = () => {
	const [snack, setSnack] = useState(initSnackContext);
	return {
		snack,
		setSnack,
	};
};
