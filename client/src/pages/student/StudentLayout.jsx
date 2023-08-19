import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "src/components/layouts/partials/Header";

export const StudentLayout = () => {
	return (
		<>
			<Header />
			<Box sx={{ minHeight: "100vh" }}>
				<Outlet />
			</Box>
		</>
	);
};
