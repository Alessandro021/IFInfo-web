/* eslint-disable no-undef */
import { defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
const env = loadEnv(
	"all",
	process.cwd()
);
const __dirname = path.dirname(__filename);
export default defineConfig({
	plugins: [react()],
	server: {
		port: env.VITE_PORT || 3001
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
});
