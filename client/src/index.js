import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Router } from "./Router";
import { theme } from "./styles/mui-styles/theme";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ThemeProvider theme={theme}>
		<RouterProvider router={Router}>
			<App />
		</RouterProvider>
	</ThemeProvider>
);
