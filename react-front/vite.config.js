import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".jsx", ".tsx"], // .map((ext) => `.${ext}`).filter((ext) => ext !== ".jsx"),
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/assets": path.resolve(__dirname, "./src/assets/"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/requests": path.resolve(__dirname, "./src/requests")
    }
  }
});
