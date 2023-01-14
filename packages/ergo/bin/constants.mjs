//@ts-check

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

export const root = process.cwd();
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const ergoRoot = resolve(__dirname, "..");
