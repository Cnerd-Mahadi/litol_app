import { Components, Theme } from "@mui/material";
import { Button } from "./button";

export const overrides: Components<Theme> = {
	MuiButton: Button,
};
