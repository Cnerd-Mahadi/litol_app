import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const Typography: TypographyOptions = {
	fontFamily: inter.style.fontFamily,
	htmlFontSize: 16,
	fontWeightBold: 600,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightLight: 300,

	h1: {
		fontSize: 36,
		lineHeight: 2.5,
		fontWeight: 600,
	},

	h2: {
		fontSize: 30,
		lineHeight: 2.25,
		fontWeight: 600,
	},

	h3: {
		fontSize: 24,
		lineHeight: 2,
		fontWeight: 600,
	},

	h4: {
		fontSize: 20,
		lineHeight: 1.75,
		fontWeight: 500,
	},

	h5: {
		fontSize: 16,
		lineHeight: 1.5,
		fontWeight: 500,
	},

	h6: {
		fontSize: 14,
		lineHeight: 1.25,
		fontWeight: 500,
	},

	body1: {
		fontSize: 18,
		lineHeight: 1.75,
		fontWeight: 400,
	},

	body2: {
		fontSize: 14,
		lineHeight: 1.25,
		fontWeight: 400,
	},

	subtitle1: {
		fontSize: 12,
		lineHeight: 1,
		fontWeight: 300,
	},
};
