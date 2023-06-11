import { TextField } from "@mui/material";
import React from "react";
import { toCapFirst } from "../../utilities/utility";

export const InputField = ({ id, type, margin, autoComplete, autoFocus }) => {
	return (
		<TextField
			margin={margin ? margin : "none"}
			required
			fullWidth
			id={id}
			type={type}
			label={toCapFirst(id)}
			name={id}
			autoComplete={autoComplete ? autoComplete : ""}
			autoFocus={autoFocus ? true : false}
		/>
	);
};
