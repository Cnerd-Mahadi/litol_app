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
	details: `Welcome to our innovative Active Learning Method platform, a
	revolutionary approach designed to enhance knowledge retention and
	topic mastery. Our platform is meticulously crafted to provide
	students with an engaging and effective learning experience, helping
	them grasp complex concepts and retain information with remarkable
	ease. With our cutting-edge platform, we've seamlessly integrated
	active learning techniques that have been proven to elevate learning
	outcomes`,
};

export const features = {
	learn: {
		name: "Learn Section",
		details: `Dive into our "Learn" section, where curated content awaits students, including tutorials, lectures, and informative resources. This section caters to various learning styles and preferences, enabling students to access materials that suit their needs. Our platform places the power of learning in the hands of the user`,
	},
	summary: {
		name: "Summary",
		details: `Our platform offers a unique "Summary" feature that empowers students to distill complex topics into concise summaries. After crafting their summary, students can challenge themselves with a quiz, guessing the main points using three provided keywords as hints. This active recall technique enhances comprehension and retention`,
	},
	note: {
		name: "Note",
		details: `Experience the power of effective note-taking with our "Notes" feature, inspired by the Cornell Note-Taking Method. Students can jot down cues, questions, and highlights while studying. These cues serve as valuable prompts for reviewing and self-testing, transforming the way students engage with their materials`,
	},
	mindmap: {
		name: "MindMap",
		details: `Unleash your creativity with our "Mindmap" tool, which enables users to visually organize concepts, ideas, and connections. This intuitive diagram-based approach enhances understanding and helps students see the bigger picture. Effortlessly create mind maps to reinforce learning and facilitate comprehensive understanding`,
	},
	feynman: {
		name: "Feynman Gallery",
		details: `In the "Feynman Gallery," students can explore and interact with the community's Feynman requests. Engage with explanations submitted by fellow learners or contribute your own insights. For collaborative learning, the feature facilitates Google Meet chat invitations, promoting shared understanding and camaraderie among students`,
	},
};
