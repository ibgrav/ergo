import { resolve } from "path";
import type { FC } from "react";
import { renderToString } from "react-dom/server";
import { root, __dirname } from "../bin/constants.mjs";
import { ErgoConfig } from "../types/index.js";

export function renderServer(config: Required<ErgoConfig>, Page: FC): string {
  const pageImportPath = resolve(root, config.pagesDir, "index.tsx");

  return renderToString(
    <html>
      <head>
        <title>Test!</title>
      </head>
      <body>
        <div id="root">
          <Page />
        </div>

        <script dangerouslySetInnerHTML={{ __html: `window.ERGO_PAGE_IMPORT_PATH = "${pageImportPath}";` }}></script>
        <script type="module" src={`/src/render-client.tsx`}></script>
      </body>
    </html>
  );
}
