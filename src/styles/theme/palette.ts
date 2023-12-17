import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
	interface TypeText {
		dark?: string;
	}
}

export const COLOR_PALETTE = {
	BLUE: "#60a5fa",
	BLUE_LIGHT: "#bfdbfe",
	BUTTON_BLUE: "#3b82f6",
	BUTTON_HOVER_BLUE: "#2563eb",
	TEXT: "#1e293b",
	TEXT_DARK: "#082f49",
	TEXT_LIGHT: "#d1d5db",
	DISABLED: "#e5e7eb",
	GREEN: "#bbf7d0",
	GREEN_DARK: "#4ade80",
	RED: "#fecaca",
	RED_DARK: "#ef4444",
	BG_LIGHT: "#f8fafc",
	DIVIDER: "#a1a1aa",
};

export const Palette: PaletteOptions = {
	mode: "light",
	common: {
		white: "#fff",
		black: "#000",
	},
	primary: {
		main: COLOR_PALETTE.BLUE,
		light: COLOR_PALETTE.BLUE_LIGHT,
	},
	success: {
		main: COLOR_PALETTE.GREEN,
		dark: COLOR_PALETTE.GREEN_DARK,
	},
	error: {
		main: COLOR_PALETTE.RED,
		dark: COLOR_PALETTE.RED_DARK,
	},
	text: {
		primary: COLOR_PALETTE.TEXT,
		secondary: COLOR_PALETTE.TEXT_LIGHT,
		disabled: COLOR_PALETTE.DISABLED,
		dark: COLOR_PALETTE.TEXT_DARK,
	},
	divider: COLOR_PALETTE.DIVIDER,
};
