import { Button } from "@/components/ui/button";
import { useMindMap } from "@/hooks/mindmap-hook";
import { PlusIcon } from "@radix-ui/react-icons";
import { MdDelete } from "react-icons/md";

export const MindmapBar = () => {
	const { handleAddNode, handleClearCanvas } = useMindMap();
	return (
		<div className="absolute bottom-10 right-10 rounded-md hidden md:flex flex-col gap-4">
			<Button onClick={handleAddNode} variant="outline" size="icon">
				<PlusIcon className="w-4" />
			</Button>
			<Button onClick={handleClearCanvas} variant="outline" size="icon">
				<MdDelete className="w-4 text-slate-600" />
			</Button>
		</div>
	);
};
