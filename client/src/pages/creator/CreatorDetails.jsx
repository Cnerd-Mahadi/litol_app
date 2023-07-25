import React from "react";
import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { ContentLayout } from "../../layouts/content_layout/creator/ContentLayout";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";

const localUserData = getLocalData("userData");

export const CreatorDetails = () => {
	const { contentId } = useParams();
	const { isLoading, data: details } = useGetQuery(
		"creator/contentDetails",
		`creator/contentDetails/${contentId}`,
		getHeader(headerType.tokenize, localUserData.token),
		{
			user_id: localUserData.userInfo.details.user_id,
		}
	);

	if (isLoading) return <Loading />;

	return (
		<div>
			<ContentLayout content={details.content} contents={details.contents} />
		</div>
	);
};
