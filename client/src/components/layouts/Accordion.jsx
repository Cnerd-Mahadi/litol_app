import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionDetails,
	AccordionSummary,
	Accordion as MuiAccordion,
	Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";

export const Accordion = ({ data }) => {
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<MuiAccordion
			key={data.key}
			expanded={expanded === `panel${data.key}`}
			onChange={handleChange(`panel${data.key}`)}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel${data.key}bh-content`}
				id={`panel${data.key}bh-header`}>
				<Typography sx={{ color: "text.secondary" }}>{data.key}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{data.details}</Typography>
			</AccordionDetails>
		</MuiAccordion>
	);
};

Accordion.propTypes = {
	data: PropTypes.object.isRequired,
};
