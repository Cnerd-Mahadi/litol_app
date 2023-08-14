import { Box, Link } from "@mui/material";
import { CueCard } from "../components/cards/CueCard";
import { features } from "../utils";

export const CueBoxStyle = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "center",
	gap: "100px",
	marginTop: "60px",
	marginBottom: "200px",
};

export const Cue = () => {
	return (
		<Box sx={CueBoxStyle}>
			{features.map((feature) => {
				return (
					<Link key={feature.name} href={feature.route} underline="none">
						<CueCard image={feature.image} text={feature.name} />
					</Link>
				);
			})}
		</Box>
	);
};
