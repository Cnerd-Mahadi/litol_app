import { Modal as TransitionalModal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { PropTypes } from "prop-types";

const style = {
	zIndex: 10,
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "white",
	borderRadius: "20px",
};

export default function Modal({ children, open, setInvitation }) {
	const handleClose = () =>
		setInvitation((prev) => ({
			...prev,
			open: false,
		}));

	return (
		<TransitionalModal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}>
			<Fade in={open}>
				<Box sx={style}>{children}</Box>
			</Fade>
		</TransitionalModal>
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	open: PropTypes.bool.isRequired,
	setInvitation: PropTypes.func.isRequired,
};
