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
	plugins: [react()],
	esbuild: {
		loader: "jsx",
		include: ["src/**/*.jsx", "src/**/*.js"],
		exclude: [],
	},
	resolve: {
		alias: {
			src: "/src",
		},
	},
});
