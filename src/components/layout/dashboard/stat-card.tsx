import { Box, Stack, Typography, useTheme } from "@mui/material";
import { PropTypes } from "prop-types";
import { Loading } from "src/components/ui/Loading";
import { borderStyle } from "src/styles/components/Layouts";
import { statItems } from "src/utils/resources";

export const StatCard = ({ info, loading }) => {
	const theme = useTheme();
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			spacing={2}
			sx={{ ...borderStyle(theme), p: 2 }}>
			{statItems.map((item) => (
				<Stack
					key={item.id}
					direction="row"
					alignItems={"center"}
					spacing={2}
					flex={1}
					sx={{
						p: 1,
						backgroundColor: theme.palette.primary.light,
						color: theme.palette.primary.main,
						borderRadius: 3,
						paddingLeft: 4,
					}}>
					<Box color={theme.palette.primary.main} pt={1.3}>
						{item.icon}
					</Box>
					<Stack direction="row" spacing={1} alignItems={"center"}>
						<Typography variant="h4">{item.name} :</Typography>
						{!loading ? (
							<Typography variant="h4">{info[item.id]}</Typography>
						) : (
							<Loading size={20} />
						)}
					</Stack>
				</Stack>
			))}
		</Stack>
	);
};

StatCard.propTypes = {
	info: PropTypes.object,
	loading: PropTypes.bool,
};
