import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Skip eslint plugin if you don’t want lint errors too
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],

  // ✅ Suppress known esbuild type warnings
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
