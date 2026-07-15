"use client";

import { useEffect, useState } from "react";

/** phones only (below Tailwind's `sm`, 640px) — tablets are treated as desktop-sized and keep Dialog/DropdownMenu. */
export const MOBILE_QUERY = "(max-width: 639px)";

/** false until mounted, to avoid a hydration mismatch. */
export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(query);
		setMatches(mql.matches);

		const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, [query]);

	return matches;
}
