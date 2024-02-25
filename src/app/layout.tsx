import { Toaster } from "@/components/ui/toaster";
import { PrimeProvider } from "@/contexts/prime-provider";
import { FlowProvider } from "@/contexts/react-flow-provider";
import { ReactQueryProvider } from "@/contexts/react-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LITOL APP",
	description: "Revolutinize the way of learning",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`inter.className`}>
				<ReactQueryProvider>
					<PrimeProvider>
						<FlowProvider>{children}</FlowProvider>
					</PrimeProvider>
				</ReactQueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
