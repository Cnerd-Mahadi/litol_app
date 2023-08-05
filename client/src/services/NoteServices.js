import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";
import { useStatus } from "../hooks/useStatus";
import {
	checkUniqueness,
	getHeader,
	getLocalData,
	headerType,
} from "../utilities/utility";
import { apiPostDataHandler } from "./apiManager";

const localUserData = getLocalData("userData");

export const NoteServices = () => {
	const { snack, setSnack, setLoading, loading } = useStatus();
	const queryClient = useQueryClient();
	const noteSchema = yup.object().shape({
		title: yup
			.string()
			.required()
			.min(3)
			.max(20)
			.test("titleCheck", "Title is not available", async function (value) {
				if (value) {
					const isUnique = await checkUniqueness(
						"student/titleCheck",
						getHeader(headerType.tokenize, getLocalData("userData").token),
						{
							title: value,
							collection: "notes",
							user_id: getLocalData("userData").userInfo.id,
						}
					);
					return isUnique;
				}
				return true;
			}),
		cues: yup.array().of(
			yup.object().shape({
				key: yup
					.string()
					.required("Key field is required")
					.min(3, "Key must be at least 3 characters")
					.max(20, "Key can be maximum 20 characters"),
				details: yup
					.string()
					.required("Details field is required")
					.max(350, "Details can be maximum 350 characters"),
			})
		),
		details: yup.string().required().min(3).max(100),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			cues: [
				{
					key: "",
					details: "",
				},
			],
			details: "",
		},
		mode: "onBlur",
		resolver: yupResolver(noteSchema),
	});

	const onSubmit = (data) => {
		const resultData = {
			...data,
			user_id: localUserData.userInfo.id,
		};

		console.log(resultData);
		setLoading(true);
		apiPostDataHandler(
			"student/submitNote",
			resultData,
			getHeader(headerType.tokenize, localUserData.token)
		).then((res) => {
			console.log(res);
			setLoading(false);
			queryClient.invalidateQueries("student/notes");
			setSnack({
				open: true,
				severity: "success",
				message: "New note created successfully!",
			});
		});
	};

	return {
		handleSubmit,
		control,
		onSubmit,
		errors,
		snack,
		setSnack,
		loading,
	};
};
