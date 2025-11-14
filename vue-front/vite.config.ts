import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@/layouts",
        replacement: path.resolve(__dirname, "./src/layouts"),
      },
      {
        find: "@/pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@/assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@/composable",
        replacement: path.resolve(__dirname, "./src/composable"),
      },
      {
        find: "@/lib",
        replacement: path.resolve(__dirname, "./src/lib"),
      },
      {
        find: "@/store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@/routes",
        replacement: path.resolve(__dirname, "./src/routes"),
      },
      {
        find: "@/presets",
        replacement: path.resolve(__dirname, "./src/presets"),
      },
      {
        find: "@/",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});