import { FileUploadOutlined } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";

export const FormImage = () => {
	const [image, setImage] = React.useState(null);

	const handleImageChange = (event) => {
		const imageFile = event.currentTarget.files[0];
		console.log(imageFile);
		imageFile && setImage(URL.createObjectURL(event.currentTarget.files[0]));
	};

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
					src={image ? image : "/image/general/no-image.png"}
					alt=""
					width={"100%"}
					height={"250px"}
				/>
			</Grid>
			<Grid
				item
				xs={4}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "end",
				}}>
				<Button
					component="label"
					variant="outlined"
					startIcon={<FileUploadOutlined />}>
					Upload Image
					<input
						type="file"
						hidden
						name="image"
						id="image"
						onChange={handleImageChange}
					/>
				</Button>
			</Grid>
		</>
	);
};
