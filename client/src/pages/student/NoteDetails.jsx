import { useParams } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getHeader, getLocalData, headerType } from "../../utilities/utility";
import { Loading } from "../Loading";
import { ContentLayout } from "./../../layouts/content_layout/note/ContentLayout";

const localUserData = getLocalData("userData");

export const NoteDetails = () => {
	const { noteId } = useParams();
	const { isLoading, data } = useGetQuery(
		"student/note",
		`student/note/${noteId}`,
		getHeader(headerType.tokenize, localUserData.token)
	);

	console.log(data);

	if (isLoading) return <Loading />;

	return (
		<div>
			<ContentLayout content={data.note} contents={data.notes} />
		</div>
	);
};
