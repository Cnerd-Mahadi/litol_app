import { Stack } from "@mui/material";
import { createContext } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import { SideBar } from "src/components/layouts/partials/SideBar";

export const SidebarContext = createContext();

export const StudentLayout = () => {
	const location = useLocation();

	const patterns = [
		"/student/mindmap/:mindmapId",
		"/student/mindmap/board/:userId",
	];
	const boardLocation = patterns.some((pattern) => {
		const match = matchPath({ path: pattern }, location.pathname);
		return match !== null;
	});

	return (
		<Stack direction="row">
			{!boardLocation && <SideBar />}
			<Stack flex={1} marginLeft={!boardLocation ? "250px" : "0px"}>
				<Outlet />
			</Stack>
		</Stack>
	);
};
