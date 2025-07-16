import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      treeshake: false, // 🚫 disable aggressive tree shaking to avoid this bug
    },
  },
});
