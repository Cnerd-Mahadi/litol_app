import { ThemeProvider } from "@mui/material";
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import App from "./App.jsx";
import { Router } from "./Router.jsx";
import { theme } from "./styles/mui-styles/theme";

const queryClient = new QueryClient();
export const SnackContext = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
	<ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<ReactFlowProvider>
				<RouterProvider router={Router}>
					<React.StrictMode>
						<App />
					</React.StrictMode>
				</RouterProvider>
			</ReactFlowProvider>
		</QueryClientProvider>
	</ThemeProvider>
);
