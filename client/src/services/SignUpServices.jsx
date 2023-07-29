import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getHeader, headerType } from "../utilities/utility";
import { apiGetDataHandler } from "./apiManager";

export const SignUpServices = () => {
	const navigate = useNavigate();

	yup.addMethod(yup.string, "userCheck", (value) => {});
	// yup.addMethod(yup.string, "emailCheck", (value) => {
	// 	return apiGetDataHandler(
	// 		"student/emailCheck",
	// 		getHeader(headerType.tokenize),
	// 		{
	// 			email: value,
	// 		}
	// 	);
	// });

	const signUpSchema = yup
		.object({
			username: yup
				.string()
				.required()
				.min(3)
				.test("userCheck", "Username not available", async (value) => {
					return await apiGetDataHandler(
						"student/usernameCheck",
						getHeader(
							headerType.tokenize,
							"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDbmVyZCIsImp0aSI6ImI0IVRzbUlkbjhiVXJZbTNkM0FkX2FuM3JEIiwiaWF0IjoxNjg5MjAzNzgzLjM5NTI5LCJleHAiOjE3MjA3Mzk3ODMuMzk1MjksImlkIjoiMGNiNzk1MWRlMDNiNGJlMWEyMzciLCJyb2xlIjoic3R1ZGVudCJ9.-pGG-KALydNz5tSRsQYMWg1VjxUSYAuXsGQH3mEmgOY"
						),
						{
							username: value,
						}
					);
				}),
			dob: yup
				.date()
				.max(new Date(), "Date must be before today")
				.min(new Date(Date.parse("1900-01-01")), "Date must be after year 1900")
				.typeError("Date must be a valid date"),
			gender: yup.string().required(),
			email: yup
				.string()
				.email()
				.required()
				.test("emailCheck", "Email not available", async (value) => {
					return await apiGetDataHandler(
						"student/emailCheck",
						getHeader(
							headerType.tokenize,
							"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDbmVyZCIsImp0aSI6ImI0IVRzbUlkbjhiVXJZbTNkM0FkX2FuM3JEIiwiaWF0IjoxNjg5MjAzNzgzLjM5NTI5LCJleHAiOjE3MjA3Mzk3ODMuMzk1MjksImlkIjoiMGNiNzk1MWRlMDNiNGJlMWEyMzciLCJyb2xlIjoic3R1ZGVudCJ9.-pGG-KALydNz5tSRsQYMWg1VjxUSYAuXsGQH3mEmgOY"
						),
						{
							email: value,
						}
					);
				}),
			password: yup
				.string()
				.required()
				.min(5)
				.matches(
					/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/,
					"Password must contain at least one number and one letter"
				),
			address: yup.string().required(),
			phone: yup
				.string()
				.required()
				.matches(/^01\d{9}$/, "Phone number must be valid"),
		})
		.required();

	const { handleSubmit, control } = useForm({
		values: {
			username: "",
			dob: "2022-04-17",
			gender: "male",
			email: "",
			password: "",
			address: "",
			phone: "",
		},
		mode: "all",
		resolver: yupResolver(signUpSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		// event.preventDefault();
		// const data = new FormsData(event.currentTarget);
		// const role = isCreator ? "CREATOR" : "STUDENT";
		// const resultData = {
		// 	role: role,
		// 	username: data.get("name"),
		// 	age: data.get("age"),
		// 	dob: data.get("date"),
		// 	gender: data.get("gender"),
		// 	email: data.get("email"),
		// 	password: data.get("password"),
		// 	address: data.get("address"),
		// 	bio: data.get("bio"),
		// 	phone: data.get("phone"),
		// 	emailCheck: data.get("emailCheck"),
		// };
		// console.log(resultData, "FormData");
		// handleSignUp("signUp", resultData, navigate);
	};

	return {
		control,
		handleSubmit,
		onSubmit,
	};
};
