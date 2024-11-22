import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

function shouldUseMockServer() {
  return process.env.USE_MOCKS === "1";
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "src/mocks/devMocks",
      enable: shouldUseMockServer(),
    }),
  ],
  preview: {
    port: 8080,
  },
  server:
    mode === "development"
      ? {
          proxy: {
            "/acceptances": {
              target: "http://localhost:5173", // Replace with your backend server's URL
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(/^\/acceptances/, "/api/acceptances"),
            },
            "/warehouses": {
              target: "http://localhost:5173", // Replace with your backend server's URL
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(/^\/warehouses/, "/api/warehouses"),
            },
          },
        }
      : {},
}));
