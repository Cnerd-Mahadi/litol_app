import { ThemeProvider } from "@/styles";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "LITOL APP",
	description: "Learn and Retain Like Never Before",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
