import { getHeader, headerType, setLocalData } from "../utilities/utility";
import { apiPostDataHandler } from "./apiManager";

export const handleSignIn = async (url, data, navigate) => {
	const response = await apiPostDataHandler(
		url,
		data,
		getHeader(headerType.nodata)
	);
	const responseData = response;

	if (responseData.success) {
		setLocalData("userData", responseData.data);
		if (responseData.data.role === "STUDENT") navigate("/student");
		if (responseData.data.role === "CREATOR") navigate("/creator");
	}
};

export const handleSignUp = async (url, data, navigate) => {
	const responseStatus = (
		await apiPostDataHandler(url, data, getHeader(headerType.nodata))
	).success;

	if (responseStatus) {
		console.log("New user created successfully!");
		navigate("/");
	}
};
