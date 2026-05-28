import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*"],
	sourcemap: true,
	clean: true,
	format: ["cjs", "esm"],
	bundle: true,
	external: ["next", "next/*", "react", "react/*", "use-debounce"],
	esbuildOptions(options) {
		options.drop = ["console"]; // this is the esbuild option
	},
});
