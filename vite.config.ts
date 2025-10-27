import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react")) return "react";
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/firebase")) return "firebase";
          if (id.includes("node_modules/zod")) return "zod";
          if (id.includes("node_modules/react-router-dom")) return "router";
          if (id.includes("node_modules/chart.js")) return "chart";
          if (id.includes("node_modules/react-chartjs-2")) return "react-chart";
        },
      },
    },
  },
});
