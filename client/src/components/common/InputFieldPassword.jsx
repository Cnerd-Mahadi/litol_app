import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";

export const InputFieldPassword = ({ id, margin }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => setShowPassword((show) => !show);

	return (
		<FormControl fullWidth required margin={margin ? margin : "none"}>
			<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
			<OutlinedInput
				name={id}
				fullWidth
				required
				autoComplete="current-password"
				id={id}
				label="Password"
				type={showPassword ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={togglePassword}
							edge="end">
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};
