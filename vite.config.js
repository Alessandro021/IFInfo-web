/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
const __dirname = path.dirname(__filename);
export default defineConfig({
	plugins: [react()],
	server: {
		port: import.meta.env.VITE_API_URL || 3001
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
});
