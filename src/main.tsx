import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Self-hosted Inter variable font — eliminates the Google Fonts render-blocking
// cross-origin request. One WOFF2 variable font file covers all weights (100–900).
import "@fontsource-variable/inter";

const container = document.getElementById("root")!;

// Mirrors App.tsx's lazy route table. On a prerendered route, the matching
// chunk must already be resolved before hydrateRoot runs — otherwise React's
// first hydration pass suspends on the still-pending import() and mismatches
// against the server's non-suspended content (visible as React errors
// #418/#423, most reliably on larger chunks like Blog's react-markdown
// bundle that don't happen to resolve before hydration starts).
function preloadRouteChunk(pathname: string) {
  if (pathname === "/") return import("./pages/Index");
  if (pathname === "/blog") return import("./pages/Blog");
  if (pathname.startsWith("/blog/")) return import("./pages/BlogPost");
  return import("./pages/NotFound");
}

async function bootstrap() {
  // Prerendered routes (see scripts/prerender.mjs) ship real markup inside
  // #root; hydrate onto it instead of wiping it out and re-rendering from
  // scratch. Routes that haven't been prerendered yet still get an empty
  // container and fall back to today's plain client render.
  if (container.hasChildNodes()) {
    await preloadRouteChunk(window.location.pathname);
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
}

bootstrap();
