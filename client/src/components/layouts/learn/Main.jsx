import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";
import { Stack, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import { PropTypes } from "prop-types";
import { colors } from "src/utils";

function Main({ content }) {
	const theme = useTheme();
	const date = new Date(Date.parse(content.sys.publishedAt));

	return (
		<Stack spacing={5} alignItems={"center"} width={"90%"}>
			<Stack spacing={2} textAlign={"center"}>
				<Typography
					variant="h2"
					gutterBottom
					color={colors.text}
					fontWeight={700}>
					{content.title}
				</Typography>
				<Typography
					variant="body2"
					lineHeight={1}
					color={colors.text_light}
					fontWeight={theme.typography.fontWeightMedium}>
					Published At: {date.toDateString()} , {content.subjectRef.name}
				</Typography>
			</Stack>
			<Image
				src={content.image.url}
				alt="display image"
				height={350}
				style={{
					objectFit: "cover",
					borderRadius: 12,
					boxShadow: theme.shadows[3],
				}}
			/>
			<Stack spacing={3}>
				<Stack>
					{documentToReactComponents(content.details.json, {
						renderMark: {
							[MARKS.CODE]: (text) => (
								<Typography
									component={"pre"}
									color={colors.white}
									bgcolor={colors.text_dark}
									fontWeight={theme.typography.fontWeightMedium}
									fontSize={"1.1rem"}
									px={2.5}
									py={1.5}
									borderRadius={4}
									my={1}>
									<Typography component={"code"}>{text}</Typography>
								</Typography>
							),
						},
					})}
				</Stack>
				<Stack>{documentToReactComponents(content.usefulLinks.json)}</Stack>
			</Stack>
		</Stack>
	);
}
export default Main;

Main.propTypes = {
	content: PropTypes.object.isRequired,
};
