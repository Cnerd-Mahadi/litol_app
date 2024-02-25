import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
	},
	server: {
		port: 3000,
	},
	plugins: [
		react(),

		// Workaround
		{
			name: "load+transform-js-files-as-jsx",
			async transform(code, id) {
				if (!id.match(/src\/.*\.js$/)) {
					return null;
				}

				// Use the exposed transform from vite, instead of directly
				// transforming with esbuild
				return transformWithEsbuild(code, id, {
					loader: "jsx",
					jsx: "automatic", // 👈 this is important
				});
			},
		},
		// End workaround
	],

	// Workaround before renaming .js to .jsx
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
	resolve: {
		alias: {
			src: "/src",
		},
	},
});
