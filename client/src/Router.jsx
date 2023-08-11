import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { MindMapCanvas } from "./layouts/mindmap/MindMapCanvas";
import { MindMapCanvasDetails } from "./layouts/mindmap/MindMapCanvasDetails";
import { Error } from "./pages/Error";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Content } from "./pages/student/Content";
import { FeynmanLayout } from "./pages/student/FeynmanLayout";
import { LearnDetails } from "./pages/student/LearnDetails";
import { MindMap } from "./pages/student/MindMap";
import { Note } from "./pages/student/Note";
import { NoteDetails } from "./pages/student/NoteDetails";
import { StudentDash } from "./pages/student/StudentDash";
import { StudentLayout } from "./pages/student/StudentLayout";
import { Subject } from "./pages/student/Subject";
import { Summary } from "./pages/student/Summary";
import { SummaryDetails } from "./pages/student/SummaryDetails";
import { getLocalData } from "./utilities/utility";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <SignIn />,
				loader: () => {
					return getLocalData("userData") ? redirect("/student") : null;
				},
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/student",
				element: <StudentLayout />,
				loader: () => {
					return getLocalData("userData") ? null : redirect("/");
				},
				children: [
					{
						index: true,
						element: <StudentDash />,
					},
					{
						path: "/student/learn",
						element: <Subject />,
					},
					{
						path: "/student/learn/subject/:subjectId",
						element: <Content />,
					},
					{
						path: "/student/learn/topic/:topicId",
						element: <LearnDetails />,
					},
					{
						path: "/student/summary",
						element: <Summary />,
					},
					{
						path: "/student/summary/:summaryId",
						element: <SummaryDetails />,
					},
					{
						path: "/student/note",
						element: <Note />,
					},
					{
						path: "/student/note/:noteId",
						element: <NoteDetails />,
					},
					{
						path: "/student/mindmap",
						element: <MindMap />,
					},
					{
						path: "/student/mindmap/board/:userId",
						element: <MindMapCanvas />,
					},
					{
						path: "/student/mindmap/:mindmapId",
						element: <MindMapCanvasDetails />,
					},
					{
						path: "/student/feynman",
						element: <FeynmanLayout />,
					},
				],
			},
		],
	},
]);
