import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	AccordionDetails,
	AccordionSummary,
	Box,
	Accordion as MuiAccordion,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { BiClipboard } from "react-icons/bi";
import { colors } from "src/utils";

export const Accordion = ({ data }) => {
	const [expanded, setExpanded] = useState(false);
	const theme = useTheme();

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<MuiAccordion
			key={data.key}
			sx={{
				boxShadow: theme.shadows[4],
			}}
			expanded={expanded === `panel${data.key}`}
			onChange={handleChange(`panel${data.key}`)}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel${data.key}bh-content`}
				id={`panel${data.key}bh-header`}>
				<Stack direction="row" alignItems={"center"} width={"100%"}>
					<Box pr={4} display="flex">
						<BiClipboard size={25} color={theme.palette.primary.main} />
					</Box>
					<Typography
						sx={{ color: theme.palette.primary.main }}
						fontWeight={theme.typography.fontWeightBold}>
						{data.key}
					</Typography>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Typography color={colors.text_light}>{data.details}</Typography>
			</AccordionDetails>
		</MuiAccordion>
	);
};

Accordion.propTypes = {
	data: PropTypes.object.isRequired,
};
