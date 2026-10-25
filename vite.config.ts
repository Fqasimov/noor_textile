import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// `--mode artifact` builds a single-file bundle with relative asset paths for the claude.ai preview.
export default defineConfig(({ mode }) => ({
  base: mode === "artifact" ? "./" : "/",
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build:
    mode === "artifact"
      ? {
          outDir: "dist-artifact",
          copyPublicDir: false,
          cssCodeSplit: false,
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : {},
}));
