import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

export const InputFieldPassword = ({ id, label, control }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => setShowPassword((show) => !show);

	return (
		<Controller
			name="password"
			control={control}
			render={({ field, fieldState }) => (
				<FormControl margin="none">
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						fullWidth
						id={id}
						label={label}
						type={showPassword ? "text" : "password"}
						onChange={field.onChange}
						onBlur={field.onBlur}
						value={field.value}
						error={fieldState.error ? true : false}
						endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={togglePassword} edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText error={fieldState.error ? true : false}>
						{fieldState.error?.message}
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
