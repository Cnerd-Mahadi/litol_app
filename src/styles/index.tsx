// export const borderStyle = (theme) => ({
// 	boxShadow: theme.shadows[1],
// 	borderRadius: 3,
// });

// export const roundedImage = {
// 	objectFit: "cover",
// 	borderRadius: 2,
// };
"use client";

import NextAppDirEmotionCacheProvider from "@/styles/theme/emotion-cache";
import {
	CssBaseline,
	ThemeProvider as GlobalThemeProvider,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { globalTheme } from "./theme/index";

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
			<GlobalThemeProvider theme={globalTheme}>
				<CssBaseline />
				{children}
			</GlobalThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
};
