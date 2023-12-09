import { Stack, Typography } from "@mui/material";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import { Link } from "src/components/ui/Link";
import { colors } from "src/utils";

export const HorizontalImageCard = ({ link, image, actionText, lightText }) => {
	// const theme = useTheme();

	return (
		<Link to={link}>
			<Stack
				direction={"row"}
				spacing={3}
				sx={{
					":hover h6": {
						color: colors.blue,
					},
				}}>
				<Image
					src={image}
					width={100}
					height={60}
					objectFit="cover"
					style={{
						borderRadius: 6,
					}}
				/>
				<Stack>
					<Typography variant="h6">{actionText}</Typography>
					<Typography variant="caption1" color={colors.text_light}>
						{lightText}
					</Typography>
				</Stack>
			</Stack>
		</Link>
	);
};

HorizontalImageCard.propTypes = {
	link: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	actionText: PropTypes.string.isRequired,
	lightText: PropTypes.string.isRequired,
};
