import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { colorCode } from "../../utilities/utility";

export const Footer = () => {
	return (
		<Container
			maxWidth="2xl"
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				p: 2,
				backgroundColor: colorCode.navyBlue,
			}}>
			<Typography variant="subtitle1" color={colorCode.white}>
				{"All Rights Reserved To "}
				<Link
					underline="none"
					color="inherit"
					href="#"
					sx={{
						":hover": {
							color: "primary.main",
						},
					}}>
					Team ETERNALS
				</Link>
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
				<IconButton
					sx={{ color: colorCode.white, "&:hover": { color: "primary.main" } }}>
					<FacebookOutlined fontSize="medium" />
				</IconButton>
				<IconButton
					sx={{ color: colorCode.white, "&:hover": { color: "primary.main" } }}>
					<Instagram fontSize="medium" />
				</IconButton>
				<IconButton
					sx={{ color: colorCode.white, "&:hover": { color: "primary.main" } }}>
					<LinkedIn fontSize="medium" />
				</IconButton>
			</Box>
		</Container>
	);
};
