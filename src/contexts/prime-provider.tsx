"use client";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/tailwind-light/theme.css";
import { ReactNode } from "react";

export const PrimeProvider = ({ children }: { children: ReactNode }) => {
	return <PrimeReactProvider>{children}</PrimeReactProvider>;
};
