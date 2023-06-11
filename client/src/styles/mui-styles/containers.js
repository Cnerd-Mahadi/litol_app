import { signInImage } from "../../utilities/staticImageResources";

export const CueBoxStyle = {
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "center",
	gap: "100px",
	marginTop: "60px",
	marginBottom: "200px",
};

export const SignInImageBoxStyle = {
	backgroundImage: `url(${signInImage})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
	height: "740px",
};

export const SignInContainerStyle = {
	my: 8,
	mx: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

export const SignUpContainerStyle = {
	marginTop: 8,
	marginBottom: 4,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
};

export const ErrorStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
	minHeight: "100vh",
	backgroundColor: "#041C32",
};
