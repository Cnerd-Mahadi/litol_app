import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<Box
			component={"main"}
			maxWidth="xl"
			sx={{
				m: "auto",
			}}>
			<Outlet />;
		</Box>
	);
}
export default App;
