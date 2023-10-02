import { FeynmanForm } from "src/components/layouts/Feynman/FeynmanForm";
import { FeynmanProvider } from "src/contexts/FeynmanProvider";
import { FeynmanGallery } from "./FeynmanGallery";

export const Feynman = () => {
	return (
		<>
			<FeynmanProvider>
				<FeynmanGallery />
				<FeynmanForm />
			</FeynmanProvider>
		</>
	);
};
