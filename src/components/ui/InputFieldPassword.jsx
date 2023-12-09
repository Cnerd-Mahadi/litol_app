import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const InputFieldPassword = ({ id, control, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => setShowPassword((show) => !show);

	return (
		<Controller
			name={id}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl margin="none" fullWidth>
					<InputLabel>{props.label}</InputLabel>
					<OutlinedInput
						{...props}
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

InputFieldPassword.propTypes = {
	id: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
};
