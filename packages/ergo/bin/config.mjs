//@ts-check

import { resolve } from "path";
import { root } from "./constants.mjs";

/** @typedef {Required<import('../types').ErgoConfig>} RequiredErgoConfig */

/**
 * @param {import('vite').ViteDevServer} vite
 * @returns {Promise<RequiredErgoConfig>}
 */
export async function getUserConfig(vite) {
  /** @type {RequiredErgoConfig} */
  const defaultConfig = {
    port: 4000,
    outDir: "dist",
    pagesDir: "src/pages",
  };

  try {
    const configPath = resolve(root, "ergo.config.ts");
    const { default: userConfig } = await vite.ssrLoadModule(configPath);

    return { ...defaultConfig, ...userConfig };
  } catch (e) {}

  return defaultConfig;
}
