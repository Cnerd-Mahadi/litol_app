import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Error } from "./pages/Error";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

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
			{
				path: "/signup",
				element: <SignUp />,
			},
			// {
			// 	path: "/student",
			// 	element: <StudentLayout />,
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
			// 			element: <Feynman />,
			// 		},
			// 	],
			// },
			// {
			// 	path: "/creator",
			// 	element: <CreatorLayout />,
			// 	children: [
			// 		{
			// 			index: true,
			// 			element: <CreatorDash />,
			// 		},
			// 		{
			// 			path: "/creator/content/:contentId",
			// 			element: <CreatorDetails />,
			// 		},
			// 	],
			// },
		],
	},
]);
