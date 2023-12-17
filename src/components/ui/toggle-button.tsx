import {
	ToggleButton as MuiToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { PropTypes } from "prop-types";

export const ToggleButton = ({ options, alignment, setAlignment }) => {
	const handleChange = (event) => {
		setAlignment(event.target.value);
	};
	return (
		<ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
			<MuiToggleButton value={options[0]}>{options[0]}</MuiToggleButton>
			<MuiToggleButton value={options[1]}>{options[1]}</MuiToggleButton>
		</ToggleButtonGroup>
	);
};

ToggleButton.propTypes = {
	options: PropTypes.array.isRequired,
	alignment: PropTypes.string.isRequired,
	setAlignment: PropTypes.func.isRequired,
};
