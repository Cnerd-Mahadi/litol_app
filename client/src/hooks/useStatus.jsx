import { useState } from "react";

const initSnackContext = {
	open: false,
	severity: "success",
	message: "",
};

export const useStatus = () => {
	const [loading, setLoading] = useState(false);
	const [snack, setSnack] = useState(initSnackContext);
	return {
		loading,
		snack,
		setLoading,
		setSnack,
	};
};
