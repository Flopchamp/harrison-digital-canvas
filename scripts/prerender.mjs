import { build } from "vite";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// src/integrations/supabase/client.ts (Supabase-generated, not hand-edited)
// passes `storage: localStorage` directly in its config, evaluated the moment
// the module loads. Every query transitively imports that client, so simply
// importing the rendered app crashes in Node without this. A no-op stub is
// correct here: there is no real user session to persist during a build-time
// render. This assignment must run before the dynamic import() below —
// static imports are hoisted before a module's body runs, so the same
// statement placed inside entry-server.tsx itself would execute too late.
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

// F21 extends this list once /blog/:slug has its own query module and slug
// enumeration (F16's shared fetch-published-slugs.mjs) wired in.
const ROUTES = ["/", "/blog"];

const SEO_BLOCK_RE = /<!-- SEO_DEFAULTS_START[\s\S]*?SEO_DEFAULTS_END -->/;

/**
 * Bundles src/entry-server.tsx into a Node-executable module using Vite's own
 * build API in SSR mode — reuses vite.config.ts's exact alias/plugin setup
 * (no separate resolution config to keep in sync) rather than adding a
 * third-party SSG library or a hand-rolled esbuild config.
 */
async function buildServerEntry() {
  await build({
    root,
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
      rollupOptions: {
        output: { format: "es", entryFileNames: "entry-server.mjs" },
      },
    },
    logLevel: "warn",
  });
}

function injectHelmet(html, helmet) {
  if (!helmet) return html;
  const helmetTags = [
    helmet.title?.toString(),
    helmet.meta?.toString(),
    helmet.link?.toString(),
    helmet.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  if (!SEO_BLOCK_RE.test(html)) {
    throw new Error(
      "index.html is missing the SEO_DEFAULTS_START/END markers prerender.mjs relies on to inject per-route meta tags."
    );
  }
  return html.replace(SEO_BLOCK_RE, helmetTags);
}

function injectDehydratedState(html, dehydratedState) {
  // application/json (not a plain executable script) so the payload is inert
  // data to the browser until React Query's HydrationBoundary reads it —
  // never parsed/executed as JS.
  const stateTag = `<script id="__REACT_QUERY_STATE__" type="application/json">${JSON.stringify(
    dehydratedState
  ).replace(/</g, "\\u003c")}</script>`;
  return html.replace("</head>", `    ${stateTag}\n  </head>`);
}

async function prerender() {
  await buildServerEntry();

  // pathToFileURL is required on Windows: a raw absolute path like
  // "C:\..." is misparsed by the ESM loader as a URL with scheme "c:".
  const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.mjs")));
  const template = readFileSync(resolve(root, "dist/index.html"), "utf-8");

  for (const url of ROUTES) {
    const { html, helmet, dehydratedState } = await render(url);

    let page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    page = injectHelmet(page, helmet);
    page = injectDehydratedState(page, dehydratedState);

    const outPath =
      url === "/" ? resolve(root, "dist/index.html") : resolve(root, `dist${url}/index.html`);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, page);
    console.log(`Prerendered ${url} -> ${outPath.replace(root, ".")}`);
  }
}

prerender()
  .then(() => process.exit(0)) // Supabase's autoRefreshToken timer otherwise keeps the process alive
  .catch((error) => {
    console.error("Prerender failed:", error);
    process.exit(1);
  });
