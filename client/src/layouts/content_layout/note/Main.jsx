import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Main({ content }) {
	const [expanded, setExpanded] = React.useState(false);

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
			<Typography variant="h3" gutterBottom>
				{content.details.title}
			</Typography>
			{content.cue.map((data) => {
				return (
					<Box marginBottom={2} key={data.note_details_id}>
						<Accordion
							key={data.note_details_id}
							expanded={expanded === `panel${data.note_details_id}`}
							onChange={handleChange(`panel${data.note_details_id}`)}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`panel${data.note_details_id}bh-content`}
								id={`panel${data.note_details_id}bh-header`}>
								<Typography sx={{ width: "33%", flexShrink: 0 }}>
									Cue
								</Typography>
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
