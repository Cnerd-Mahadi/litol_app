import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectField = ({ id, label, control, menu }) => {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl fullWidth margin="none">
					<InputLabel>{label}</InputLabel>
					<Select
						label={label}
						value={field.value}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={fieldState.error ? true : false}>
						{menu.map((option) => {
							return (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							);
						})}
					</Select>
					<FormHelperText error={fieldState.error ? true : false}>
						{fieldState.error?.message}
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
