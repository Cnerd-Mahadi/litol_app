import { PropTypes } from "prop-types";
import { createContext, useState } from "react";

export const FeynmanContext = createContext();

export const FeynmanProvider = ({ children }) => {
	const [invitation, setInvitation] = useState({
		open: false,
		info: undefined,
	});

	return (
		<FeynmanContext.Provider value={{ invitation, setInvitation }}>
			{children}
		</FeynmanContext.Provider>
	);
};

FeynmanProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
