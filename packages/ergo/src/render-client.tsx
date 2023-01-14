import { createRoot } from "react-dom/client";

declare global {
  interface Window {
    ERGO_PAGE_IMPORT_PATH?: string;
  }
}

console.log("ERGO_PAGE_IMPORT_PATH\n", window.ERGO_PAGE_IMPORT_PATH);

if (window.ERGO_PAGE_IMPORT_PATH) {
  const { default: Page } = await import(/* @vite-ignore */ window.ERGO_PAGE_IMPORT_PATH);

  const root = createRoot(document.getElementById("root")!);
  root.render(<Page />);
}
