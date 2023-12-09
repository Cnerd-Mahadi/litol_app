import { useState } from "react";

export const useToggle = (options) => {
	const [alignment, setAlignment] = useState(options[0]);
	return {
		alignment,
		setAlignment,
	};
};
