import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Error } from "./pages/Error";
import { SignIn } from "./pages/SignIn";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <SignIn />,
			},
			// {
			// 	path: "/signup",
			// 	element: <SignUp />,
			// },
			// {
			// 	path: "/student",
			// 	element: <StudentLayout />,
			// 	loader: () => {
			// 		return getLocalData("userData") ? null : redirect("/");
			// 	},
			// 	children: [
			// 		{
			// 			index: true,
			// 			element: <StudentDash />,
			// 		},
			// 		{
			// 			path: "/student/learn",
			// 			element: <Subject />,
			// 		},
			// 		{
			// 			path: "/student/learn/subject/:subjectId",
			// 			element: <Content />,
			// 		},
			// 		{
			// 			path: "/student/learn/topic/:topicId",
			// 			element: <LearnDetails />,
			// 		},
			// 		{
			// 			path: "/student/summary",
			// 			element: <Summary />,
			// 		},
			// 		{
			// 			path: "/student/summary/:summaryId",
			// 			element: <SummaryDetails />,
			// 		},
			// 		{
			// 			path: "/student/note",
			// 			element: <Note />,
			// 		},
			// 		{
			// 			path: "/student/note/:noteId",
			// 			element: <NoteDetails />,
			// 		},
			// 		{
			// 			path: "/student/mindmap",
			// 			element: <MindMap />,
			// 		},
			// 		{
			// 			path: "/student/mindmap/board/:userId",
			// 			element: <MindMapCanvas />,
			// 		},
			// 		{
			// 			path: "/student/mindmap/:mindmapId",
			// 			element: <MindMapCanvasDetails />,
			// 		},
			// 		{
			// 			path: "/student/feynman",
			// 			element: <FeynmanLayout />,
			// 		},
			// 	],
			// },
		],
	},
]);
