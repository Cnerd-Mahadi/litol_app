import { apiPostDataHandler } from "./apiManager";

export const handleSignIn = async (url, data, navigate) => {
	const response = await apiPostDataHandler(url, data);
	const responseData = response.data;

	if (response.status && responseData) {
		localStorage.setItem("userData", JSON.stringify(responseData));
		if (responseData.role === "STUDENT") navigate("/student");
		if (responseData.role === "CREATOR") navigate("/creator");
	}
};

export const handleSignUp = async (url, data, navigate) => {
	const responseStatus = (await apiPostDataHandler(url, data)).status;

	if (responseStatus === 200) {
		console.log("New user created successfully!");
		navigate("/");
	}
};
