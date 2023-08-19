export const images = {
	studentDash: "/image/general/class.jpg",
	signIn: "/image/general/SI.png",
	logo: "/image/general/logo.png",
	user: "/image/basic/user.png",
	learn: "/image/basic/learn.png",
	summary: "/image/basic/summary.png",
	note: "/image/basic/cornell.png",
	mindmap: "/image/basic/mindmap.png",
	feynman: "/image/basic/feynman.png",
	no_image: "/image/general/no-image.png",
};

export const pages = [
	{
		name: "Learn",
		feature: "Learn A Topic",
		route: "/student/learn",
		icon: images.learn,
	},
	{
		name: "Summary",
		feature: "Summarize The Topic",
		route: "/student/summary",
		icon: images.summary,
	},
	{
		name: "Cornell",
		feature: "Use Cornell Method",
		route: "/student/note",
		icon: images.note,
	},
	{
		name: "MindMap",
		feature: "Mind Map",
		route: "/student/mindmap",
		icon: images.mindmap,
	},
	{
		name: "Feynman",
		feature: "Feynman Section",
		route: "/student/feynman",
		icon: images.feynman,
	},
];

export const fileAllowed = "multipart/form-data";

export const userSettings = ["Logout"];

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

export const colorCode = {
	navyBlue: "#083344",
	red: "#ef4444",
	white: "#f3f4f6",
};
