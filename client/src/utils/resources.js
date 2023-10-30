import { BiClipboard, BiNotepad, BiSolidBookContent } from "react-icons/bi";
import { FaChalkboardUser } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { LuNetwork } from "react-icons/lu";

export const images = {
	studentDash: "/image/general/class.jpg",
	signIn: "/image/general/SI.png",
	logo: "/image/general/logo.png",
	about: "/image/basic/about.png",
	user: "/image/basic/user.jpg",
	learn: "/image/basic/learn.png",
	summary: "/image/basic/summary.png",
	note: "/image/basic/note.png",
	mindmap: "/image/basic/mindmap.png",
	feynman: "/image/basic/feynman.png",
	no_image: "/image/general/no-image.png",
};

export const navItems = [
	{
		name: "Home",
		route: "/student/dash",
		icon: <GoHomeFill size={22} />,
	},
	{
		name: "Learn",
		route: "/student/learn",
		icon: <BiSolidBookContent size={20} />,
	},
	{
		name: "Summary",
		route: "/student/summary",
		icon: <BiNotepad size={20} />,
	},
	{
		name: "Note",
		route: "/student/note",
		icon: <BiClipboard size={20} />,
	},
	{
		name: "MindMap",
		route: "/student/mindmap",
		icon: <LuNetwork size={20} />,
	},
	{
		name: "Feynman",
		route: "/student/feynman",
		icon: <FaChalkboardUser size={20} />,
	},
];

export const statItems = [
	{
		id: "summaries",
		name: "Summary",
		icon: <BiNotepad size={25} />,
	},
	{
		id: "notes",
		name: "Note",
		icon: <BiClipboard size={25} />,
	},
	{
		id: "mindmaps",
		name: "MindMap",
		icon: <LuNetwork size={25} />,
	},
];

export const fileAllowed = "multipart/form-data";

export const genderOptions = [
	{
		value: "male",
		label: "Male",
	},
	{
		value: "female",
		label: "Female",
	},
	{
		value: "other",
		label: "Other",
	},
];

export const sidebarInfo = {
	learn: {
		type: "Browse Contents",
		tldr: `To find mentoring online from other user on this topic try the request feyman button below the topic. Feyman request helps you to start a
		request for following topic where other user can mentor you on this
		topic over a feyman session when they accept it`,
	},
	notes: {
		type: "See Your Other Notes",
		tldr: `Cornell section is inspired by cornell note taking method where the lesson can be remembered or structured using key and details`,
	},
	summaries: {
		type: "See Your Other Summaries",
		tldr: `Summary section helps you retain a lesson using your own summary where the summary would be based on keywords. Here the keywords are the hints of the lesson which helps you remember the lesson`,
	},
};

export const about = {
	name: "What are we?",
	details: `In this digital age of education students are facing the issue of information overload and difficulties in retaining knowledge. While there are established offline active learning methods for students, there is currently a lack of online solutions to replicate these methods. To solve this issue here comes our platform LITOL. It provides features based on active learning techniques like Cornell Note Taking, Summarization, the Feynman Approach, and Mind mapping. There is an additional Learn section so that students can read content on various topics and engage in the Feynman technique. This platform overall gives a student opportunity to apply Cornell Note Taking method to take class notes, Summarize the material after reading, Use mind mapping for visual memorization and use Feynman Technique to learn as a group`,
};

export const features = {
	learn: {
		name: "Learn Section",
		details: `This section is provided as an extension with Feynman section. In this section students can learn the provided topics from range of subjects. And if they have difficulties in understanding any of the topic they can ask for help from other students using Feynman request button provided in the bottom`,
	},
	summary: {
		name: "Summary",
		details: `Students can create a summary on a topic which contains a topic image, title, details, keys. Keys are basically keyword related to the topic. The strategy is the details of the topic would be hidden to students for them to recall while studying. Only the keys will be shown. Students will try to recall the material using the hint of the content. If they are unable to do that there is a show button to reveal the content`,
	},
	note: {
		name: "Note",
		details: `Students can take notes during class using Cornell Note Taking strategy. It contains a title, details and cues. Cues are consist of key and details. It is used to structure the material in a question answer manner. Where the key is a question and the detail is the answer. It helps students to take structured note based on question-answer in the classroom`,
	},
	mindmap: {
		name: "MindMap",
		details: `Students can create mind map in a drawing board. It contains title, nodes and edges. It is just like traditional mind mapping technique but for online. Massively helpful for brainstorming and analysis`,
	},
	feynman: {
		name: "Feynman Gallery",
		details: `When a student requests a topic to be discussed in the learn section, that request will be stored in the Feynman section for other students to see. If a student wants to teach that topic to students who have requested it, they can invite them to a session using a Google Meet link. A session can contain up to 4 students. This technique is based on the principle articulated by Richard Feynman that "teaching is to learn twice." When a student conducts a Feynman session, they will better understand the topic by teaching it, and the other students will learn the topic from them`,
	},
};
