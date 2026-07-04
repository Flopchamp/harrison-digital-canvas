import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { AppShell } from "./AppShell";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { HOME_ROUTE_QUERIES } from "./queries/homeQueries";

// Direct (non-lazy) page imports — deliberate, not an oversight. renderToString
// is synchronous and cannot wait on a pending lazy()/Suspense import the way
// the client's code-split routes do; the server only ever renders once per
// process anyway, so there is no bundle-size reason to lazy-load here.

/** Which prefetchable queries a given route needs, so the prerender script
 * can populate the cache before renderToString ever runs. Routes with no
 * entry here (blog list/post) get their own list in F20/F21. */
function queriesForRoute(url: string) {
  if (url === "/") return HOME_ROUTE_QUERIES;
  return [];
}

export async function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
      },
    },
  });

  await Promise.all(
    queriesForRoute(url).map((query) => queryClient.prefetchQuery(query))
  );

  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <AppShell>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
    dehydratedState: dehydrate(queryClient),
  };
}
