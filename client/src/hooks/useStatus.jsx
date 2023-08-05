import { useState } from "react";
import { initSnackContext } from "../utilities/utility";

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
