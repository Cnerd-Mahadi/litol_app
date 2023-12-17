import { Link } from "@/components/ui/link";
import { Stack, Typography, useTheme } from "@mui/material";

export const LogOut = () => {
	const theme = useTheme();
	return (
		<Stack
			sx={{
				px: 4,
				py: 15,
				color: theme.palette.text.primary,
			}}>
			<Link component="button">
				<Stack
					direction={"row"}
					spacing={3}
					sx={{
						"&:hover": {
							cursor: "pointer",
							color: theme.palette.primary.main,
						},
						p: 1,
						borderRadius: 1.5,
						backgroundColor: theme.palette.primary.light,
					}}>
					{/* <Avatar src={localUserData()?.image} sx={{ width: 30, height: 30 }} /> */}
					<Stack direction={"row"} alignItems={"center"} spacing={0.5}>
						{/* <LogoutOutlined /> */}
						<Typography variant="h5">LogOut</Typography>
					</Stack>
				</Stack>
			</Link>
		</Stack>
	);
};
