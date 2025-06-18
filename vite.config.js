import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/video_feed": "http://localhost:5000",
      "/upload_frame": "http://localhost:5000",
      "/stats": "http://localhost:5000",
    },
  },
});
