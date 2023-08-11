import { FileUploadOutlined } from "@mui/icons-material";
import { Button, FormHelperText, Grid } from "@mui/material";
import { Controller, useController } from "react-hook-form";

export const FormImage = ({ control, id, register }) => {
	// const handleImageChange = (event) => {
	// 	const imageFile = event.currentTarget.files[0];
	// 	console.log(imageFile);
	// 	imageFile && setImage();
	// };

	const { field } = useController({
		control,
		name: id,
	});

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
				<img
					className="image--rounded image--fit"
					src={
						field.value
							? URL.createObjectURL(field.value[0])
							: "/image/general/no-image.png"
					}
					alt=""
					width={"100%"}
					height={"250px"}
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
								<input type="file" hidden {...register("image")} />
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
