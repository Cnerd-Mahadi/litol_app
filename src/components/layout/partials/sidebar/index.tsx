import { Stack, useTheme } from "@mui/material";
import { navItems } from "src/utils/resources";
import { LogOut } from "./LogOut";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";

export const SideBar = () => {
	const theme = useTheme();
	return (
		<Stack
			sx={{
				width: "250px",
				height: "100%",
				position: "fixed",
				zIndex: 10,
				top: 0,
				bottom: 0,
				borderRight: `1px solid ${theme.palette.divider}`,
			}}>
			<Stack
				spacing={4}
				sx={{
					py: 3,
					px: 2,
				}}>
				<Logo />
				<Stack spacing={1.5} sx={{ px: 2 }}>
					{navItems.map((navItem) => (
						<NavItem key={navItem.name} navItem={navItem} />
					))}
				</Stack>
			</Stack>
			<LogOut />
		</Stack>
	);
};
