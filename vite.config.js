import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { createRequire } from "node:module";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactVirtualized()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@pages": path.resolve("src/pages"),
      "@components": path.resolve("src/components"),
    },
  },
});

const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;
export function reactVirtualized() {
  return {
    name: "flat:react-virtualized",
    // Note: we cannot use the `transform` hook here
    //       because libraries are pre-bundled in vite directly,
    //       plugins aren't able to hack that step currently.
    //       so instead we manually edit the file in node_modules.
    //       all we need is to find the timing before pre-bundling.
    configResolved() {
      const require = createRequire(import.meta.url);
      const file = require
        .resolve("react-virtualized")
        .replace(
          path.join("dist", "commonjs", "index.jsx"),
          path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
        );
      const code = fs.readFileSync(file, "utf-8");
      const modified = code.replace(WRONG_CODE, "");
      fs.writeFileSync(file, modified);
    },
  };
}
