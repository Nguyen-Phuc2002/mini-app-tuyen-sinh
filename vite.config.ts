import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  publicDir: "public",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
