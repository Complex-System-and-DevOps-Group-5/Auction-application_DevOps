/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // server is for development
    host: '0.0.0.0',
    port: 5173,
    watch: {
        usePolling: true
    }
  },
  preview: { // preview is for to check out the production build
    host: '0.0.0.0',
    port: 5173,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
  },
});




