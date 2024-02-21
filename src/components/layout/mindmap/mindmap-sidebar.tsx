"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ListBulletIcon } from "@radix-ui/react-icons";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface MindMapSidebarProps {
	children: ReactNode;
}

interface MindMapContextType {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MindMapContext = createContext<MindMapContextType | null>(null);

export const MindMapSidebar = ({ children }: MindMapSidebarProps) => {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild className="block md:hidden">
				<Button
					onClick={() => {}}
					variant="outline"
					size="icon"
					className="px-2 absolute top-4 right-4">
					<ListBulletIcon className="size-6" />
				</Button>
			</SheetTrigger>
			<MindMapContext.Provider value={{ open, setOpen }}>
				<SheetContent className="w-full max-w-md">{children}</SheetContent>
			</MindMapContext.Provider>
		</Sheet>
	);
};

export const useMindMapSideBar = () => {
	const context = useContext(MindMapContext);
	if (!context) throw new Error("No mindmap sidebar context found!");
	return context;
};
