import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { getRoutes, routeOutputPath } from "./lib/routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SEO_MARKER_RE = /<!-- SEO_DEFAULTS_(START|END) -->/;
const EMPTY_ROOT_RE = /<div id="root">\s*<\/div>/;

/**
 * Asserts a single prerendered route's output file is real, usable HTML —
 * not a silently empty or half-broken artifact. Returns every problem found
 * (not just the first) so one run gives complete diagnostics.
 */
function checkRoute(url) {
  const outPath = routeOutputPath(root, url);

  if (!existsSync(outPath)) {
    return [`${url}: expected output file missing at ${outPath.replace(root, ".")}`];
  }

  const html = readFileSync(outPath, "utf-8");
  const failures = [];

  if (EMPTY_ROOT_RE.test(html)) {
    failures.push(`${url}: #root is empty — renderToString produced no markup`);
  }

  if (SEO_MARKER_RE.test(html)) {
    failures.push(`${url}: SEO_DEFAULTS marker still present — Helmet injection did not run`);
  }

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/);
  if (!titleMatch || !titleMatch[1].trim()) {
    failures.push(`${url}: missing or empty <title>`);
  }

  const stateMatch = html.match(/__REACT_QUERY_STATE__[^>]*>([\s\S]*?)<\/script>/);
  if (!stateMatch) {
    failures.push(`${url}: missing __REACT_QUERY_STATE__ script tag`);
  } else {
    try {
      const state = JSON.parse(stateMatch[1]);
      for (const query of state.queries ?? []) {
        if (query.state?.status === "error") {
          failures.push(`${url}: query ${JSON.stringify(query.queryKey)} dehydrated with an error status`);
        }
      }
    } catch {
      failures.push(`${url}: __REACT_QUERY_STATE__ payload is not valid JSON`);
    }
  }

  return failures;
}

async function main() {
  const routes = await getRoutes();
  const allFailures = routes.flatMap(checkRoute);

  if (allFailures.length > 0) {
    console.error(`Prerender verification FAILED — ${allFailures.length} issue(s) across ${routes.length} route(s):`);
    for (const failure of allFailures) console.error(`  - ${failure}`);
    // exitCode (not exit()) lets Node drain in-flight handles from the Supabase
    // fetch above before exiting — calling process.exit() immediately after
    // that fetch resolves races its socket teardown and crashes on Windows
    // (libuv assertion in src/win/async.c). generate-sitemap.mjs, which uses
    // the same underlying client, avoids this the same way.
    process.exitCode = 1;
    return;
  }

  console.log(`Prerender verification passed for all ${routes.length} route(s).`);
}

main().catch((error) => {
  console.error("Prerender verification crashed:", error);
  process.exitCode = 1;
});
