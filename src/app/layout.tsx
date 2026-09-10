import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "LITOL",
	description: "Your AI study partner for everything you learn.",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
			suppressHydrationWarning>
			<body className="font-sans">
				<div
					hidden
					dangerouslySetInnerHTML={{
						__html: `<!-- impeccable:direction 635bad7b
THESIS: The standard SaaS workspace, finished to the level of Linear and Vercel. It refuses the dashboard-template arrangement: tinted icon tiles, uppercase section kickers, identical feature cards.
OWN-WORLD: Navy ground stratified into page, sidebar, and panel by a few percent of lightness; hairline borders at low alpha; one orange accent reserved for primary actions only, selection is neutral; Geist on an eight-step role scale; subject hues only as dots and chips, never as surfaces.
STORY: A student lands on today's cue, flips it, sees recent material, and reaches every action from the header or a labeled sidebar without hunting.
FIRST VIEWPORT: Labeled 224px sidebar left. Header: greeting and date left; New note (primary), Generate summary, Take a quiz right. One hairline metric strip. Recall card at three fifths width beside the recent-activity list.
FORM: The category canon, the standing exit, chosen in the owner's words. Seed 635bad7b.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance. -->`,
					}}
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<TooltipProvider delayDuration={400}>{children}</TooltipProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
