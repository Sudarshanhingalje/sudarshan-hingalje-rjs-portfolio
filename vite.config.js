import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      treeshake: false, // 🚫 disable aggressive tree shaking to avoid this bug
    },
  },
});
