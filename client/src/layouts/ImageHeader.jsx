import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export const ImageHeader = ({ height, width }) => {
	return (
		<Box
			sx={{
				"& > :not(style)": {},
			}}>
			<Paper elevation={0}>
				<img
					src={"/image/general/class.jpg"}
					width={width}
					height={height}
					alt=""
				/>
			</Paper>
		</Box>
	);
};
