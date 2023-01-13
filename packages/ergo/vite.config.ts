import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: "src/index.ts",
      preserveEntrySignatures: "strict",
      external: [],
      output: [
        {
          dir: "dist",
          format: "esm",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].mjs",
          chunkFileNames: "[name].mjs",
        },
      ],
    },
  },
});
