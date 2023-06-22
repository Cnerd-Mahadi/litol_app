import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { ContentLayout } from "./../../layouts/content_layout/learn/ContentLayout";

const localUserData = getLocalData("userData");

export const LearnDetails = () => {
	const { topicId } = useParams();
	const { isLoading, data } = useGetQuery(
		"student/content",
		`student/content/${topicId}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(data);

	if (isLoading) return <Loading />;

	if (data.length !== 0) {
		return <ContentLayout content={data.content} contents={data.contents} />;
	}
};
