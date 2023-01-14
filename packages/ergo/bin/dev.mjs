#!/usr/bin/env node
//@ts-check

import { createServer } from "http";
import { resolve } from "path";
import { createServer as createViteServer } from "vite";
import react from "@vitejs/plugin-react";
import glob from "fast-glob";
import { getUserConfig } from "./config.mjs";
import { ergoRoot, root, __dirname } from "./constants.mjs";
import { getPagesGlob } from "./globs.mjs";

const vite = await createViteServer({
  root: ergoRoot,
  appType: "custom",
  plugins: [react()],
  server: {
    middlewareMode: true,
    watch: { usePolling: true, interval: 100 },
  },
});

const config = await getUserConfig(vite);

const renderServerPath = resolve(__dirname, "../src/render-server.tsx");
const renderServerModule = await vite.ssrLoadModule(renderServerPath);
/** @type {import('../src/render-server').renderServer} */
const renderServer = renderServerModule.renderServer;

const server = createServer(async (req, res) => {
  vite.middlewares(req, res, async () => {
    const pages = await getPagesGlob(config);
    const pageImportPath = pages[0] || "";

    const { default: Page } = await vite.ssrLoadModule(pageImportPath);

    let html = renderServer({ Page, pageImportPath });

    html = await vite.transformIndexHtml(req.url || "/", html);

    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    res.end(html);
  });
});

server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/`);
});
