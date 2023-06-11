import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../../layouts/Detail";
import { baseURL } from "../../utilities/utility";

export const CDetails = () => {
	const [details, setDetailsInfo] = React.useState([]);
	const { contentId } = useParams();
	React.useEffect(() => {
		axios
			.get(
				baseURL +
					`creator/contentDetail?creator_id=${
						JSON.parse(localStorage.getItem("userData")).user.creator_id
					}&content_id=${contentId}`
			)
			.then((response) => {
				setDetailsInfo(response.data);
				console.log(response.data);
			});
	}, [contentId]);

	console.log(details);

	if (details && details.content) {
		return (
			<div>
				<Detail
					content={details.content}
					contents={details.contents}
					role="CREATOR"
				/>
			</div>
		);
	}
};
