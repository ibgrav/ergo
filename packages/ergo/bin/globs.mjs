//@ts-check

import { resolve } from "path";
import glob from "fast-glob";
import { root } from "./constants.mjs";

/** @param {Required<import('../types').ErgoConfig>} config */
export async function getPagesGlob(config) {
  const pagesDirPath = resolve(root, config.pagesDir);
  return await glob([pagesDirPath + "/**/*.(t|j)sx"]);
}
