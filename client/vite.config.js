import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
	},
	server: {
		port: 3000,
	},
	plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
	resolve: {
		alias: {
			src: "/src",
		},
	},
});
