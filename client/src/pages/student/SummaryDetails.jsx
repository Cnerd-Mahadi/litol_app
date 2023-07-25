import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { ContentLayout } from "./../../layouts/content_layout/summary/ContentLayout";

const localUserData = getLocalData("userData");

export const SummaryDetails = () => {
	const { summaryId } = useParams();
	const { isLoading, data } = useGetQuery(
		"student/summary",
		`student/summary/${summaryId}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(data);

	if (isLoading) return <Loading />;

	return (
		<div>
			<ContentLayout content={data.summary} contents={data.summaries} />
		</div>
	);
};
