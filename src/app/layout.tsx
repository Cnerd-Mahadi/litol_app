import { Toaster } from "@/components/ui/toaster";
import { PrimeProvider } from "@/contexts/prime-provider";
import { ProgressProvider } from "@/contexts/progress-provider";
import { FlowProvider } from "@/contexts/react-flow-provider";
import { ReactQueryProvider } from "@/contexts/react-query-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
					<GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID!}>
						<PrimeProvider>
							<ProgressProvider>
								<FlowProvider>{children}</FlowProvider>
							</ProgressProvider>
						</PrimeProvider>
					</GoogleOAuthProvider>
				</ReactQueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
