import { colors, shadows } from "src/utils";

export const themeShadows = [
	shadows.none,
	shadows.shadow_main,
	shadows.shadow_small,
	shadows.shadow_regular,
	shadows.shadow_medium,
];

export const pxToRem = (value) => `${value / 16}rem`;

export const themeColors = {
	primary: {
		main: colors.blue,
		light: colors.blue_light,
		dark: colors.blue_dark,
		contrastText: colors.white,
	},
	text: {
		primary: colors.text_dark,
		secondary: colors.text,
		disabled: colors.disabled,
	},
	error: {
		main: colors.error,
		light: colors.error_light,
	},
	success: {
		main: colors.success,
		light: colors.success_light,
	},
	divider: colors.divider,
};

export const themeTyography = {
	fontFamily: ["Public Sans", "sans-serif"].join(","),
	htmlFontSize: 16,
	fontWeightBold: 600,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightLight: 300,

	h1: {
		fontSize: pxToRem(36),
		fontWeight: 600,
	},

	h2: {
		fontSize: pxToRem(28),
		fontWeight: 600,
	},

	h3: {
		fontSize: pxToRem(22),
		fontWeight: 600,
	},

	h4: {
		fontSize: pxToRem(16),
		fontWeight: 600,
	},

	h5: {
		fontSize: pxToRem(14),
		fontWeight: 600,
	},

	h6: {
		fontSize: pxToRem(12),
		fontWeight: 600,
	},

	body1: {
		fontSize: pxToRem(16),
		lineHeight: 2.1,
		fontWeight: 400,
		letterSpacing: "0.0075rem",
	},

	body2: {
		fontSize: pxToRem(14),
		fontWeight: 400,
	},

	subtitle1: {
		fontSize: pxToRem(12),
		fontWeight: 500,
	},

	subtitle2: {
		fontSize: pxToRem(12),
		fontWeight: 400,
	},
	caption1: {
		fontSize: pxToRem(11),
		fontWeight: 400,
	},
};

export const componentsOverride = {
	MuiLink: {
		styleOverrides: {
			root: {
				textDecoration: "none",
				color: "inherit",
			},
		},
	},

	MuiTouchRipple: {
		styleOverrides: {
			root: {
				display: "none",
			},
		},
	},

	MuiCard: {
		styleOverrides: {
			root: {
				boxShadow: shadows.shadow_main,
				borderRadius: 8,
				"&:hover": {
					color: colors.blue,
				},
			},
		},
	},

	MuiCardActionArea: {
		styleOverrides: {
			focusHighlight: {
				backgroundColor: "transparent",
			},
		},
	},
	MuiButton: {
		styleOverrides: {
			contained: {
				textTransform: "none",
				borderRadius: 6,
				padding: "0.4rem 1.5rem",
				backgroundColor: colors.blue,
				color: colors.white,
				"&:hover": {
					backgroundColor: colors.blue_dark,
				},
			},
			outlined: {
				textTransform: "none",
				borderRadius: 6,
				padding: "0.4rem 1.5rem",
				color: colors.blue,
				"&:hover": {
					backgroundColor: colors.blue,
					color: colors.white,
				},
			},
		},
	},
	MuiToggleButtonGroup: {
		styleOverrides: {
			root: {
				border: `1px solid ${colors.blue}`,
				borderRadius: 8,
			},
		},
	},
	MuiToggleButton: {
		styleOverrides: {
			root: {
				textTransform: "capitalize",
				padding: "0.5rem 3.4rem",
				color: colors.blue,
				border: "none",
				"&:hover": {
					backgroundColor: "inherit",
				},

				"&.Mui-selected": {
					backgroundColor: colors.blue,
					color: colors.white,

					"&:hover": {
						backgroundColor: colors.blue,
						color: colors.white,
					},
				},
			},
		},
	},
	MuiTooltip: {
		styleOverrides: {
			tooltip: {
				backgroundColor: colors.white,
				color: colors.text,
				boxShadow: shadows.shadow_regular,
				fontSize: 11,
				maxWidth: 400,
			},
			arrow: {
				color: colors.divider,
			},
		},
	},
};
