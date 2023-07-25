import { Box, Link } from "@mui/material";
import { CueCard } from "../components/cards/CueCard";
import { CueBoxStyle } from "../styles/mui-styles/containers";
import { features } from "../utilities/utility";

export const Cue = () => {
	return (
		<Box sx={CueBoxStyle}>
			{features.map((feature) => {
				return (
					<Link href={feature.route} underline="none">
						<CueCard image={feature.image} text={feature.name} />
					</Link>
				);
			})}
		</Box>
	);
};
