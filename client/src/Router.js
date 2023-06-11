import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Error } from "./pages/Error";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { CreatorDash } from "./pages/creator/CreatorDash";
import { CreatorLayout } from "./pages/creator/CreatorLayout";
import { CDetails } from "./pages/creator/Details";
import { Content } from "./pages/student/Content";
import { Details } from "./pages/student/Details";
import { StudentDash } from "./pages/student/StudentDash";
import { StudentLayout } from "./pages/student/StudentLayout";
import { Subject } from "./pages/student/Subject";
import { Summary } from "./pages/student/Summary";
import { SummaryDetails } from "./pages/student/SummaryDetails";

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
			{
				path: "/student",
				element: <StudentLayout />,
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
						element: <Details />,
					},
					{
						path: "/student/summary",
						element: <Summary />,
					},
					{
						path: "/student/summary/:summaryId",
						element: <SummaryDetails />,
					},
				],
			},
			{
				path: "/creator",
				element: <CreatorLayout />,
				children: [
					{
						index: true,
						element: <CreatorDash />,
					},
					{
						path: "/creator/content/:contentId",
						element: <CDetails />,
					},
				],
			},
		],
	},
]);
