import { createTheme } from "@mui/material";
import { overrides } from "./overrides";
import { Palette } from "./palette";
import { Shadows, shadowType } from "./shadows";
import { Typography } from "./typography";

declare module "@mui/material/styles" {
	interface Theme {
		themeShadows: shadowType;
	}

	interface ThemeOptions {
		themeShadows?: shadowType;
	}
}

export const globalTheme = createTheme({
	palette: Palette,
	typography: Typography,
	themeShadows: Shadows,
	components: overrides,
});
