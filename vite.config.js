import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), visualizer()],
  resolve: {
    alias: {
      // Use safer light version of lottie
      "lottie-web": "lottie-web/build/player/lottie_light.min.js",
    },
  },
  build: {
    // You can keep tree shaking ON
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
