import { Stack } from "@mui/material";
import { CreateNote } from "src/components/layouts/Note/Create";
import { NoteGallery } from "src/components/layouts/Note/List";
import { ToggleButton } from "src/components/ui/ToggleButton";
import { useToggle } from "src/hooks/useToggle";

const options = ["create", "gallery"];
export const Note = () => {
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
			{alignment === options[0] ? <CreateNote /> : <NoteGallery />}
		</>
	);
};
