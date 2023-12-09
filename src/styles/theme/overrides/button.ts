import { Components, Theme } from "@mui/material";
import { COLOR_PALETTE } from "../palette";

export const Button: Components<Theme>["MuiButton"] = {
	styleOverrides: {
		root: {
			backgroundColor: COLOR_PALETTE.buttonBlue,
			color: "#fff",
			borderRadius: 20,
			"&:hover": {
				backgroundColor: COLOR_PALETTE.buttonHoverBlue,
			},
		},
		sizeMedium: {
			padding: "0.5rem 2rem",
		},
	},
};
