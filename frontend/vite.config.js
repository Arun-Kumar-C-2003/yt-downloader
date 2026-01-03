import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// load env manually
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // load all env vars
  console.log("base url:", env.VITE_BASE_URL);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
