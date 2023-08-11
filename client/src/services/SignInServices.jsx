import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { handleSignIn } from "./userManager";

export const SignInServices = () => {
	const navigate = useNavigate();
	const [loginErr, setLoginErr] = useState(false);

	const signInSchema = yup
		.object({
			username: yup.string().required(),
			password: yup.string().required(),
		})
		.required();

	const { handleSubmit, control } = useForm({
		values: {
			username: "",
			password: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(signInSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		handleSignIn("login", data, navigate, setLoginErr);
	};

	return {
		control,
		handleSubmit,
		onSubmit,
		loginErr,
	};
};
