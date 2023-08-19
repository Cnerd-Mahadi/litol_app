import { Box } from "@mui/material";
import Image from "mui-image";
import { CueCard } from "src/components/cards/CueCard";
import { Link } from "src/components/ui/Link";
import { images, pages } from "src/utils/resources";

const cue = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "center",
	gap: "100px",
	marginTop: "60px",
	marginBottom: "200px",
};

export const StudentDash = () => {
	return (
		<>
			<Box>
				<Image alt="dash-image" src={images.studentDash} height={500} />
			</Box>
			<Box sx={cue}>
				{pages.map((page) => {
					return (
						<Link key={page.name} to={page.route} underline="none">
							<CueCard key={page.name} image={page.icon} text={page.feature} />
						</Link>
					);
				})}
			</Box>
		</>
	);
};
