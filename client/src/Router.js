import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";

import { MindMapCanvas } from "./components/layouts/Mindmap/MindMapCanvas";
import { MindMapCanvasDetails } from "./components/layouts/Mindmap/MindMapCanvasDetails";
import { Error } from "./components/ui/Error";
import { SignIn } from "./pages/SignIn";
import { Content } from "./pages/student/Content";
import { Feynman } from "./pages/student/Feynman";
import { LearnDetails } from "./pages/student/LearnDetails";
import { MindMap } from "./pages/student/MindMap";
import { Note } from "./pages/student/Note";
import { NoteDetails } from "./pages/student/NoteDetails";
import { StudentDash } from "./pages/student/StudentDash";
import { StudentLayout } from "./pages/student/StudentLayout";
import { Subject } from "./pages/student/Subject";
import { Summary } from "./pages/student/Summary";
import { SummaryDetails } from "./pages/student/SummaryDetails";
import { localUserData } from "./utils";

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
					const signedIn = localUserData();
					return signedIn ? redirect("/student") : null;
				},
			},
			{
				path: "/student",
				element: <StudentLayout />,
				loader: () => {
					const signedIn = localUserData();
					return signedIn ? null : redirect("/");
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
						element: <Feynman />,
					},
				],
			},
		],
	},
]);
