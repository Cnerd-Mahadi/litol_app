import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useStatus } from "../hooks/useStatus";
import { getHeader, getLocalData, headerType } from "../utilities/utility";
import { apiGetDataHandler } from "./apiManager";

export const FeynmanContext = createContext({});

export const FeynmanServices = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [contentInfo, setContentInfo] = useState(null);
	const [overlay, setOverlay] = useState(false);
	const { snack, setSnack, setLoading, loading } = useStatus();

	const value = {
		overlay,
		setOverlay,
		contentInfo,
		setContentInfo,
	};

	const feynmanSchema = yup
		.object({
			meeting_link: yup
				.string()
				.required("Meeting link must be provided")
				.matches(
					/^https:\/\/meet\.google\.com\/[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3}$/,
					"Google Meet link must be valid"
				),
			schedule: yup
				.date()
				.min(new Date(), "Schedule must be in the future")
				.typeError("Date must be a valid date"),
		})
		.required();

	const { handleSubmit, control } = useForm({
		defaultValues: {
			meeting_link: "",
			schedule: dayjs(Date.now()),
		},
		mode: "onTouched",
		resolver: yupResolver(feynmanSchema),
	});

	const onSubmit = (data) => {
		const formData = {
			feynman_id: contentInfo.id,
			resolverName: getLocalData("userData").userInfo.name,
			topic: contentInfo.contentData.title,
			subject: contentInfo.contentData.subjectRef.name,
			link: data.meeting_link,
			time: data.schedule.toUTCString(),
		};
		setLoading(true);
		console.log(formData);
		apiGetDataHandler(
			"student/feynman/resolve",
			getHeader(headerType.tokenize, getLocalData("userData").token),
			formData
		).then((response) => {
			setLoading(false);
			setOverlay(false);
			setSnack({
				open: true,
				message: "Feynman request resolved successfully",
				severity: "success",
			});
			queryClient.invalidateQueries("student/feynmen");
		});
	};

	return {
		control,
		handleSubmit,
		onSubmit,
		value,
		snack,
		setSnack,
		loading,
	};
};
