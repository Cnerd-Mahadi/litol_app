import { Components, Theme } from "@mui/material";
import { COLOR_PALETTE } from "../palette";
import { ROUNDS } from "../rounds";

export const Button: Components<Theme>["MuiButton"] = {
	styleOverrides: {
		root: {
			borderRadius: ROUNDS.LG,
		},
		contained: {
			backgroundColor: COLOR_PALETTE.BUTTON_BLUE,
			color: "#fff",
			"&:hover": {
				backgroundColor: COLOR_PALETTE.BUTTON_HOVER_BLUE,
			},
		},
		sizeMedium: {
			padding: "0.5rem 1.5rem",
		},
		sizeLarge: {},
		sizeSmall: {},
	},
};
