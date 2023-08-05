import { Avatar, Container, IconButton, Link, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { colorCode, pages, userSettings } from "../../utilities/utility";

export const Header = () => {
	const userRole = JSON.parse(localStorage.getItem("userData"))?.userInfo?.role;
	const [userMenu, setUserMenu] = React.useState(null);
	const navigate = useNavigate();

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
					<Link href="/">
						<img alt="logo" src="/image/basic/logo.png" height={"65px"} />
					</Link>
					<Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
						{userRole === "student" &&
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
								<Avatar
									alt="U"
									src="/image/basic/user.png"
									sx={{ width: 28, height: 28 }}
								/>
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
									<MenuItem
										key={setting}
										onClick={() => {
											toggleUserMenu();
											navigate("/");
											localStorage.removeItem("userData");
										}}>
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
