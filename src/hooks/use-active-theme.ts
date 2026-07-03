"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** theme value safe to render before mount, when the real stored/system preference isn't known yet. */
export function useActiveTheme() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const activeTheme = mounted ? theme ?? "system" : "system";

	return { activeTheme, setTheme };
}
