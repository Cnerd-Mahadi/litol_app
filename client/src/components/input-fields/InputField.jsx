import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputField = ({ id, type, label, control }) => {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					fullWidth
					id={id}
					type={type}
					label={label}
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
