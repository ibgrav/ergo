import type { FC } from "react";
import { renderToString } from "react-dom/server";
import { __dirname } from "../bin/constants.mjs";

interface RenderServerProps {
  Page: FC;
  pageImportPath: string;
}

export function renderServer({ Page, pageImportPath }: RenderServerProps): string {
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
