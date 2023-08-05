import { getHeader, headerType, setLocalData } from "../utilities/utility";
import { apiPostDataHandler } from "./apiManager";

export const handleSignIn = async (url, data, navigate, setLoginErr) => {
	const response = await apiPostDataHandler(
		url,
		data,
		getHeader(headerType.nodata)
	);
	if (response.data.hasOwnProperty("login") && !response.data.login) {
		setLoginErr(true);
	} else {
		setLoginErr(false);
		setLocalData("userData", response.data);
		navigate("/student");
	}
};

export const handleSignUp = async (
	url,
	data,
	navigate,
	setLoading,
	setSnack
) => {
	const responseStatus = (
		await apiPostDataHandler(url, data, getHeader(headerType.nodata))
	).success;

	if (responseStatus) {
		setLoading(false);
		setSnack({
			open: true,
			severity: "success",
			message: "New user created successfully!",
		});
		setTimeout(() => {
			navigate("/");
		}, 2100);
	} else {
		setLoading(false);
		setSnack({
			open: true,
			severity: "error",
			message: "User could not be created!",
		});
	}
};
