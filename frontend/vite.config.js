import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@presenters": path.resolve(__dirname, "./src/presenters"),
    },
  },

  server: {
    historyApiFallback: true,
  },
});
