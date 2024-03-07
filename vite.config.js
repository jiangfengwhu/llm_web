import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fixReactVirtualized from "esbuild-plugin-react-virtualized";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@pages": path.resolve("src/pages"),
      "@components": path.resolve("src/components"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});
