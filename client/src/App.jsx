import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { colors } from "./utils";

function App() {
	return (
		<Box
			margin={"auto"}
			maxWidth={"xl"}
			bgcolor={colors.white}
			height={"100vh"}
			overflow={"auto"}>
			<Outlet />
		</Box>
	);
}
export default App;
