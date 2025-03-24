"use client";

import { ProgressProvider as NextProgressProvider } from "@bprogress/next/app";
import { ReactNode } from "react";

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
	return (
		<NextProgressProvider options={{ showSpinner: false }} shallowRouting>
			{children}
		</NextProgressProvider>
	);
};
