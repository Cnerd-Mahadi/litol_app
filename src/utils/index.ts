import { FaBookReader, FaClipboard, FaServer } from "react-icons/fa";
import { FaBookBookmark, FaNetworkWired } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";

export const entities = {
	summaries: "summaries",
	notes: "notes",
	mindmaps: "mindmaps",
	feynmen: "feynmen",
};

export const skeletonMin = ["s1", "s2", "s3"];

export const navItems = [
	{
		name: "Home",
		route: "/",
		Icon: GoHomeFill,
	},
	{
		name: "Learn",
		route: "/learn",
		Icon: FaBookReader,
	},
	{
		name: "Summary",
		route: "/summary",
		Icon: FaBookBookmark,
	},
	{
		name: "Note",
		route: "/note",
		Icon: FaClipboard,
	},
	{
		name: "MindMap",
		route: "/mindmap",
		Icon: FaNetworkWired,
	},
	{
		name: "Feynman",
		route: "/feynman",
		Icon: FaServer,
	},
];

export const about = {
	name: "What are we?",
	details: `In this digital age of education students are facing the issue of information overload and difficulties in retaining knowledge. While there are established offline active learning methods for students, there is currently a lack of online solutions to replicate these methods. To solve this issue here comes our platform LITOL. It provides features based on active learning techniques like Cornell Note Taking, Summarization, the Feynman Approach, and Mind mapping. There is an additional Learn section so that students can read content on various topics and engage in the Feynman technique. This platform overall gives a student opportunity to apply Cornell Note Taking method to take class notes, Summarize the material after reading, Use mind mapping for visual memorization and use Feynman Technique to learn as a group`,
};

export const features = [
	{
		name: "Learn Section",
		details: `This section is provided as an extension with Feynman section. In this section students can learn the provided topics from range of subjects. And if they have difficulties in understanding any of the topic they can ask for help from other students using Feynman request button provided in the bottom`,
	},
	{
		name: "Summary",
		details: `Students can create a summary on a topic which contains a topic image, title, details, keys. Keys are basically keyword related to the topic. The strategy is the details of the topic would be hidden to students for them to recall while studying. Only the keys will be shown. Students will try to recall the material using the hint of the content. If they are unable to do that there is a show button to reveal the content`,
	},
	{
		name: "Note",
		details: `Students can take notes during class using Cornell Note Taking strategy. It contains a title, details and cues. Cues are consist of key and details. It is used to structure the material in a question answer manner. Where the key is a question and the detail is the answer. It helps students to take structured note based on question-answer in the classroom`,
	},
	{
		name: "MindMap",
		details: `Students can create mind map in a drawing board. It contains title, nodes and edges. It is just like traditional mind mapping technique but for online. Massively helpful for brainstorming and analysis`,
	},
	{
		name: "Feynman Gallery",
		details: `When a student requests a topic to be discussed in the learn section, that request will be stored in the Feynman section for other students to see. If a student wants to teach that topic to students who have requested it, they can invite them to a session using a Google Meet link. A session can contain up to 4 students. This technique is based on the principle articulated by Richard Feynman that "teaching is to learn twice." When a student conducts a Feynman session, they will better understand the topic by teaching it, and the other students will learn the topic from them`,
	},
];

export const fullWidthPath = ["/mindmap/board", "/mindmap/id"];

export const maxFileSize = 500000;

export const formatedDateTime = (value: Date) =>
	value.toLocaleString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

export const formatedName = (fullName: string) => {
	const separated = fullName.split(" ");
	if (separated.length > 1) return `${separated[0]} ${separated[1]}`;
	return separated;
};

export const acceptedImageTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
