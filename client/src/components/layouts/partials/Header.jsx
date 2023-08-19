import { Avatar, Container, IconButton, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "src/components/ui/Link";
import { NavLink } from "src/components/ui/NavLink";
import { colorCode, images, pages, userSettings } from "src/utils/resources";

export const Header = () => {
	const [userMenu, setUserMenu] = useState(null);
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
					maxWidth="2xl"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Link to="/">
						<Box component="img" alt="logo" src={images.logo} height={65} />
					</Link>
					<Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
						{pages.map((page) => (
							<NavLink key={page.name} to={page.route}>
								{page.name}
							</NavLink>
						))}

						<Box>
							<IconButton onClick={toggleUserMenu}>
								<Avatar
									alt="U"
									src={images.user}
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
											localStorage.removeItem("userData");
											navigate("/");
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
