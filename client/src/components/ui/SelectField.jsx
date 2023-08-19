import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";

export const SelectField = ({ id, control, menu, ...props }) => {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field, fieldState }) => (
				<FormControl fullWidth margin="none">
					<InputLabel>{props.label}</InputLabel>
					<Select
						{...props}
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

SelectField.propTypes = {
	id: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	menu: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired,
};
