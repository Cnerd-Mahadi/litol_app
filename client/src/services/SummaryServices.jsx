import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import * as yup from "yup";

import { useStatus } from "src/hooks/useStatus";
import {
	checkUniqueness,
	getHeader,
	getLocalData,
	headerType,
	isValidFileType,
} from "src/utils";
import { apiPostDataHandler } from "./apiManager";

export const SummaryServices = () => {
	const { snack, setSnack, setLoading, loading } = useStatus();
	const queryClient = useQueryClient();
	const summarySchema = yup
		.object({
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
								collection: "summaries",
								user_id: getLocalData("userData").userInfo.id,
							}
						);
						return isUnique;
					}
					return true;
				}),
			details: yup.string().required().max(350),
			keywords: yup
				.array()
				.test("lengthLeast", "Atleast 3 keywords required", (value) => {
					return value && value.length >= 3;
				})
				.test("lengthHighest", "Maximum 6 keywords allowed", (value) => {
					return value && value.length <= 6;
				}),
			image: yup
				.mixed()
				.test("required", "You need to provide a file", (value) => {
					return value && value.length;
				})
				.test("fileSize", "The file is too large", (value) => {
					return value && value[0] && value[0].size <= 400000;
				})
				.test("type", "We only support jpeg, png, webp type", function (value) {
					return isValidFileType(value);
				}),
		})
		.required();

	const { handleSubmit, control, register } = useForm({
		values: {
			title: "",
			details: "",
			keywords: [],
			image: undefined,
		},
		mode: "onBlur",
		resolver: yupResolver(summarySchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		setLoading(true);
		apiPostDataHandler(
			"student/submitSummary",
			{
				...data,
				image: data.image[0],
				user_id: getLocalData("userData").userInfo.id,
			},
			getHeader(headerType.multi, getLocalData("userData").token)
		).then(() => {
			setLoading(false);
			queryClient.invalidateQueries("student/summaries");
			setSnack({
				open: true,
				severity: "success",
				message: "New summary created successfully!",
			});
		});
	};

	return {
		handleSubmit,
		control,
		onSubmit,
		loading,
		snack,
		setSnack,
		register,
	};
};
