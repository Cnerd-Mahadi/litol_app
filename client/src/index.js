import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow/dist/esm";
import { App } from "./App";
import { Router } from "./Router";
import { theme } from "./styles/mui-styles/theme";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<ReactFlowProvider>
				<RouterProvider router={Router}>
					<App />
				</RouterProvider>
			</ReactFlowProvider>
		</QueryClientProvider>
	</ThemeProvider>
);
