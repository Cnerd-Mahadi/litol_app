import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropTypes } from "prop-types";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

import { Router } from "./Router";
import { AuthProvider } from "./contexts/Auth";
import { theme } from "./styles/theme";

const queryClient = new QueryClient();

export const Provider = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				<ReactFlowProvider>
					<AuthProvider>
						<RouterProvider router={Router}>{children}</RouterProvider>
					</AuthProvider>
				</ReactFlowProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
};
