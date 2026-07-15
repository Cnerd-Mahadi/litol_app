"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { MOBILE_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { createContext, useContext, type ComponentProps } from "react";

// Computed once here and read by every sub-component below via context —
// each sub-component calling useMediaQuery() independently caused a crash:
// when this flips, the parent swaps Dialog<->Drawer (different component
// types), which remounts every child fresh. A freshly-mounted child's own
// useMediaQuery() would start back at `false` for one render, picking a
// mismatched sub-component (e.g. DialogContent inside a Drawer) before its
// own effect caught up. Context isn't reset by that remount, so children
// always read the current value immediately.
const IsMobileContext = createContext(false);

/** Dialog on desktop/tablet, bottom sheet on phones. */
export function Modal({ children, ...props }: ComponentProps<typeof Dialog>) {
	const isMobile = useMediaQuery(MOBILE_QUERY);
	const Comp = isMobile ? Drawer : Dialog;
	return (
		<IsMobileContext.Provider value={isMobile}>
			<Comp {...props}>{children}</Comp>
		</IsMobileContext.Provider>
	);
}

export function ModalContent({ ...props }: ComponentProps<typeof DialogContent>) {
	const isMobile = useContext(IsMobileContext);
	const Comp = isMobile ? DrawerContent : DialogContent;
	return <Comp {...props} />;
}

export function ModalHeader({ ...props }: ComponentProps<typeof DialogHeader>) {
	const isMobile = useContext(IsMobileContext);
	const Comp = isMobile ? DrawerHeader : DialogHeader;
	return <Comp {...props} />;
}

export function ModalTitle({ ...props }: ComponentProps<typeof DialogTitle>) {
	const isMobile = useContext(IsMobileContext);
	const Comp = isMobile ? DrawerTitle : DialogTitle;
	return <Comp {...props} />;
}

export function ModalDescription({ ...props }: ComponentProps<typeof DialogDescription>) {
	const isMobile = useContext(IsMobileContext);
	const Comp = isMobile ? DrawerDescription : DialogDescription;
	return <Comp {...props} />;
}

export function ModalFooter({ ...props }: ComponentProps<typeof DialogFooter>) {
	const isMobile = useContext(IsMobileContext);
	const Comp = isMobile ? DrawerFooter : DialogFooter;
	return <Comp {...props} />;
}
