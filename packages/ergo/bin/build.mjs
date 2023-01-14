#!/usr/bin/env node
//@ts-check

import { resolve } from "path";
import { build, createServer } from "vite";
import react from "@vitejs/plugin-react";
import { getPagesGlob } from "./globs.mjs";
import { ergoRoot, root } from "./constants.mjs";
import { getUserConfig } from "./config.mjs";

process.env.NODE_ENV = "production";

const vite = await createServer({ root: ergoRoot });
const config = await getUserConfig(vite);
await vite.close();

const pages = await getPagesGlob(config);

// server build
await build({
  mode: "production",
  root: ergoRoot,
  plugins: [react()],
  build: {
    // ssr: true,
    minify: false,
    manifest: true,
    // ssrManifest: true,
    sourcemap: false,
    emptyOutDir: true,
    // outDir: resolve(root, "dist"),
    rollupOptions: {
      input: resolve(ergoRoot, "src/server.ts"),
      external: ["http", "path", "url"],
      output: {
        dir: resolve(root, "dist/server"),
        format: "esm",
        entryFileNames: "[name].mjs",
        chunkFileNames: "[name].mjs",
      },
    },
  },
});
