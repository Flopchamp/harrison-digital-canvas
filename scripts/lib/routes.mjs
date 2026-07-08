import { resolve } from "path";
import { fetchPublishedSlugs } from "./fetch-published-slugs.mjs";

// Static prerender targets. "/404" isn't a route App.tsx exposes — it renders
// via the client tree's catch-all (path="*" -> NotFound) and is written to a
// dedicated dist/404.html artifact (see routeOutputPath below).
const STATIC_ROUTES = ["/", "/blog", "/404"];

/**
 * Every URL scripts/prerender.mjs (and scripts/verify-prerender.mjs) needs to
 * render: the static routes plus one per published blog post. Reuses the same
 * fetchPublishedSlugs() the sitemap generator relies on, so a newly published
 * post is prerendered — and verified — automatically on the next build.
 */
export async function getRoutes() {
  const posts = await fetchPublishedSlugs();
  return [...STATIC_ROUTES, ...posts.map((post) => `/blog/${post.slug}`)];
}

/** Where a given route's prerendered HTML is written/read, relative to root. */
export function routeOutputPath(root, url) {
  if (url === "/") return resolve(root, "dist/index.html");
  if (url === "/404") return resolve(root, "dist/404.html");
  return resolve(root, `dist${url}/index.html`);
}
