import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Self-hosted Inter variable font — eliminates the Google Fonts render-blocking
// cross-origin request. One WOFF2 variable font file covers all weights (100–900).
import "@fontsource-variable/inter";

const container = document.getElementById("root")!;

// Prerendered routes (see scripts/prerender.mjs) ship real markup inside
// #root; hydrate onto it instead of wiping it out and re-rendering from
// scratch. Routes that haven't been prerendered yet still get an empty
// container and fall back to today's plain client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
