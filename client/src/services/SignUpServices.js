import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const SignUpServices = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);
	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormsData(event.currentTarget);
	// 	const role = isCreator ? "CREATOR" : "STUDENT";

	// 	const resultData = {
	// 		role: role,
	// 		username: data.get("name"),
	// 		age: data.get("age"),
	// 		dob: data.get("date"),
	// 		gender: data.get("gender"),
	// 		email: data.get("email"),
	// 		password: data.get("password"),
	// 		address: data.get("address"),
	// 		bio: data.get("bio"),
	// 		phone: data.get("phone"),
	// 		emailCheck: data.get("emailCheck"),
	// 	};
	// 	console.log(resultData, "FormData");

	// 	handleSignUp("signUp", resultData, navigate);
	// };
};
