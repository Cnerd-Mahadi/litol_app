import { FileUploadOutlined } from "@mui/icons-material";
import { Box, Button, FormHelperText, Grid, Input } from "@mui/material";
import { PropTypes } from "prop-types";
import { Controller, useController } from "react-hook-form";
import { isValidImage } from "src/utils";
import { images } from "src/utils/resources";

export const ImageUpload = ({ control, id }) => {
	const { field } = useController({
		control,
		name: id,
	});

	console.log(field.value?.[0]);

	return (
		<>
			<Grid
				item
				xs={8}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Box
					component="img"
					src={
						field.value && isValidImage(field.value)
							? URL.createObjectURL(field.value[0])
							: images.no_image
					}
					alt="uploaded-image"
					width={"100%"}
					height={250}
				/>
			</Grid>

			<Controller
				name={id}
				control={control}
				render={({ fieldState }) => (
					<>
						<Grid
							item
							xs={4}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Button
								component="label"
								variant="outlined"
								startIcon={<FileUploadOutlined />}>
								Upload Image
								<Controller
									name={id}
									control={control}
									render={({ field }) => (
										<Input
											type="file"
											inputProps={{ accept: "image/*" }}
											onChange={(event) => {
												field.onChange(event.target.files);
											}}
											sx={{ display: "none" }}
										/>
									)}
								/>
							</Button>
						</Grid>
						<Grid
							item
							xs={4}
							sx={{
								display: "flex",
								justifyContent: "flex-start",
							}}>
							<FormHelperText error={fieldState.error ? true : false}>
								{fieldState.error?.message}
							</FormHelperText>
						</Grid>
					</>
				)}
			/>
		</>
	);
};

ImageUpload.propTypes = {
	control: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};
