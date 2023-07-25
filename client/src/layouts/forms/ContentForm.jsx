import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export const ContentForm = ({
	maxWidth,
	headerImage,
	headerTitle,
	submitHandler,
	children,
}) => {
	return (
		<Container component="main" maxWidth={maxWidth}>
			<Box
				sx={{
					mt: 3,
					backgroundColor: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<img src={headerImage} height="100px" width="100px" alt="logo" />

				<Typography
					sx={{
						mb: 2,
						fontSize: "2rem",
						fontWeight: 700,
						color: "#18181b",
					}}>
					{headerTitle}
				</Typography>

				<Box
					component="form"
					noValidate
					onSubmit={submitHandler}
					sx={{
						mt: 3,
					}}>
					<Grid container spacing={2} justifyContent={"center"}>
						{children}
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
