import {
	CssBaseline,
	GlobalStyles as MuiGlobalStyles,
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from "@mui/material";
import { PropTypes } from "prop-types";
import {
	componentsOverride,
	themeColors,
	themeShadows,
	themeTyography,
} from ".";

const globalTheme = createTheme({
	palette: themeColors,
	typography: themeTyography,
	components: componentsOverride,
	shadows: themeShadows,
});

const GlobalStyles = () => (
	<MuiGlobalStyles
		styles={{
			"*": {
				boxSizing: "border-box",
			},
			body: {
				margin: 0,
				padding: 0,
			},
		}}
	/>
);

export const ThemeProvider = ({ children }) => {
	return (
		<MuiThemeProvider theme={globalTheme}>
			<CssBaseline />
			<GlobalStyles />
			{children}
		</MuiThemeProvider>
	);
};

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
