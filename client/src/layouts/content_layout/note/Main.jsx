import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function Main({ content }) {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Grid
			item
			xs={12}
			sx={{
				mt: 4,
			}}>
			<Typography variant="h4" marginBottom={1}>
				{content.data.title}
			</Typography>
			<Typography
				variant="body2"
				sx={{
					ml: 0.5,
					mb: 4,
				}}>
				<b>Created at</b> {content.data.updated}
			</Typography>
			<Typography
				variant="body1"
				sx={{
					ml: 0.75,
					mb: 8,
				}}>
				{content.data.details}
			</Typography>
			{content.data.cues.map((data) => {
				return (
					<Box marginBottom={2} key={data.key}>
						<Accordion
							key={data.key}
							expanded={expanded === `panel${data.key}`}
							onChange={handleChange(`panel${data.key}`)}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`panel${data.key}bh-content`}
								id={`panel${data.key}bh-header`}>
								<Typography sx={{ color: "text.secondary" }}>
									{data.key}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{data.details}</Typography>
							</AccordionDetails>
						</Accordion>
					</Box>
				);
			})}
		</Grid>
	);
}
export default Main;
