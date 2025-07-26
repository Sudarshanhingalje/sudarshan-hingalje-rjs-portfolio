// ✅ vite.config.js
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    // alias: {
    //   "lottie-web": "lottie-web/build/player/lottie_light.min.js",
    // },
  },
  build: {
    treeshake: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
