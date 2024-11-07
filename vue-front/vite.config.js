import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
