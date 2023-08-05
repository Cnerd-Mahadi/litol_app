import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useStatus } from "../hooks/useStatus";
import { checkUniqueness, getHeader, headerType } from "../utilities/utility";
import { handleSignUp } from "./userManager";

export const SignUpServices = () => {
	const navigate = useNavigate();
	const { snack, setSnack, setLoading, loading } = useStatus();

	console.log(snack);

	const signUpSchema = yup
		.object({
			username: yup
				.string()
				.required()
				.min(3)
				.max(20)
				.test(
					"usernameCheck",
					"Username is not available",
					async function (value) {
						if (value) {
							const isUnique = await checkUniqueness(
								"student/usernameCheck",
								getHeader(headerType.nodata),
								{
									username: value,
								}
							);
							return isUnique;
						}
						return true;
					}
				),
			dob: yup
				.date()
				.max(new Date(), "Date must be before today")
				.min(new Date(Date.parse("1900-01-01")), "Date must be after year 1900")
				.typeError("Date must be a valid date"),
			email: yup
				.string()
				.email()
				.required()
				.max(50)
				.test("emailCheck", "Email is not available", async function (value) {
					if (!value) return true;
					// Only perform API call if the field is not empty
					const isUnique = await checkUniqueness(
						"student/emailCheck",
						getHeader(headerType.nodata),
						{
							email: value,
						}
					);
					return isUnique;
				}),
			password: yup
				.string()
				.required()
				.min(5)
				.max(20)
				.matches(
					/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/,
					"Password must contain at least one number and one letter"
				),
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			dob: "2022-04-17",
			email: "",
			password: "",
		},
		mode: "onBlur",
		resolver: yupResolver(signUpSchema),
	});

	const onSubmit = (data) => {
		const formData = {
			...data,
			dob: data.dob.toDateString(),
			role: "student",
		};
		console.log(formData);
		setLoading(true);
		handleSignUp("signUp", formData, navigate, setLoading, setSnack);
	};

	return {
		control,
		handleSubmit,
		onSubmit,
		errors,
		loading,
		snack,
		setSnack,
	};
};
