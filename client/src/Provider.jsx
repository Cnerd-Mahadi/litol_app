import { PropTypes } from "prop-types";
import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

import { Router } from "./Router";
import { ThemeProvider } from "./styles/theme";
import { queryClient } from "./utils";

export const Provider = ({ children }) => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactFlowProvider>
					<RouterProvider router={Router}>{children}</RouterProvider>
				</ReactFlowProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
};
