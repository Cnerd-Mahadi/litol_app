import { TextField } from "@mui/material";
import { PropTypes } from "prop-types";
import { Controller } from "react-hook-form";

export const InputField = ({ id, control, ...props }) => {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...props}
					onChange={field.onChange}
					onBlur={field.onBlur}
					value={field.value}
					error={fieldState.error ? true : false}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	);
};

InputField.propTypes = {
	id: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
};
