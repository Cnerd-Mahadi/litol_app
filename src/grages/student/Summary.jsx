import { Stack } from "@mui/material";
import { CreateSummary } from "src/components/layouts/Summary/Create";
import { SummaryGallery } from "src/components/layouts/Summary/List";
import { ToggleButton } from "src/components/ui/ToggleButton";
import { useToggle } from "src/hooks/useToggle";

const options = ["create", "gallery"];
export const Summary = () => {
	const { alignment, setAlignment } = useToggle(options);

	return (
		<>
			<Stack alignItems="center" p={2}>
				<ToggleButton
					options={options}
					alignment={alignment}
					setAlignment={setAlignment}
				/>
			</Stack>
			{alignment === options[0] ? <CreateSummary /> : <SummaryGallery />}
		</>
	);
};
