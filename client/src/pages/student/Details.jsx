import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { TopicDetailComp } from "../../layouts/TopicDetailComp";
import { baseURL } from "../../utilities/utility";

export const Details = () => {
	const [topic, setTopic] = React.useState([]);
	const { topicId } = useParams();
	React.useEffect(() => {
		axios
			.get(baseURL + `student/topic?topic_id=${topicId}`)
			.then((response) => {
				setTopic(response.data);
			});
	}, [topicId]);

	if (topic.length !== 0) {
		return <TopicDetailComp topic={topic} />;
	}
};
