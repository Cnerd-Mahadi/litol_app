import { Avatar, Container, IconButton, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { colorCode, pages, userSettings } from "../../utilities/utility";

export const Header = () => {
	const userRole = JSON.parse(localStorage.getItem("userData")).role;
	const [userMenu, setUserMenu] = React.useState(null);

	const toggleUserMenu = (event) => {
		setUserMenu((userMenu) => (userMenu === null ? event.currentTarget : null));
	};

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: colorCode.navyBlue,
			}}>
			<Toolbar>
				<Container
					maxWidth="xl"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Typography
						variant="h5"
						component="a"
						href="/"
						sx={{
							fontFamily: "'Bagel Fat One', cursive",
							letterSpacing: ".5rem",
							color: colorCode.white,
							textDecoration: "none",
						}}>
						LITOL
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
						{userRole === "STUDENT" &&
							pages.map((page) => (
								<Button
									key={page.name}
									href={page.route}
									sx={{
										color: "white",
										display: "block",
										":hover": {
											backgroundColor: "#164e63",
										},
									}}>
									{page.name}
								</Button>
							))}

						<Box>
							<IconButton onClick={toggleUserMenu}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={userMenu}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(userMenu)}
								onClose={toggleUserMenu}>
								{userSettings.map((setting) => (
									<MenuItem key={setting} onClick={toggleUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
};
