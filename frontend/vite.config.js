import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@presenters": path.resolve(__dirname, "./src/presenters"),
    },
  },

  server: {
    proxy: {
      '/register': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/refresh-token': 'http://localhost:3000',
      // '/api': 'http://localhost:3000', 
      '/api': 'https://skinthesia-backend.andzuru.space', 
    },
    changeOrigin: true,
  },
});
