import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
	interface TypeText {
		dark?: string;
	}
}

export const COLOR_PALETTE = {
	blue: "#60a5fa",
	blueLight: "#bfdbfe",
	buttonBlue: "#3b82f6",
	buttonHoverBlue: "#2563eb",
	text: "#1e293b",
	textDark: "#082f49",
	textLight: "#d1d5db",
	disabled: "#e5e7eb",
	green: "#bbf7d0",
	greenDark: "#4ade80",
	red: "#fecaca",
	redDark: "#ef4444",
	bgLight: "#f8fafc",
	divider: "#a1a1aa",
};

export const Palette: PaletteOptions = {
	mode: "light",
	common: {
		white: "#fff",
		black: "#000",
	},
	primary: {
		main: COLOR_PALETTE.blue,
		light: COLOR_PALETTE.blueLight,
	},
	success: {
		main: COLOR_PALETTE.green,
		dark: COLOR_PALETTE.greenDark,
	},
	error: {
		main: COLOR_PALETTE.red,
		dark: COLOR_PALETTE.redDark,
	},
	text: {
		primary: COLOR_PALETTE.text,
		secondary: COLOR_PALETTE.textLight,
		disabled: COLOR_PALETTE.disabled,
		dark: COLOR_PALETTE.textDark,
	},
	divider: COLOR_PALETTE.divider,
};
