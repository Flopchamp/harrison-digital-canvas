import { supabase } from "@/integrations/supabase/client";

// Same pattern as src/queries/homeQueries.ts: shared queryKey + queryFn
// definitions consumed both by components (useQuery(someQuery)) and by
// scripts/prerender.mjs (via src/entry-server.tsx: queryClient.prefetchQuery(someQuery)).

export const blogPostsQuery = {
  queryKey: ["blog-posts"] as const,
  queryFn: async () => {
    // Explicit column list instead of "*" — keeps this query self-documenting
    // and defensive against future columns being added to blog_posts.
    // `content` is still required here: estimateReadTime() counts its words
    // to render the "X min read" badge on each card.
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, cover_image_url, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

// Every query the "/blog" route needs prefetched before prerendering.
export const BLOG_ROUTE_QUERIES = [blogPostsQuery];

// Factory, not a static object: /blog/:slug is parameterized, so each call
// site (BlogPost.tsx, entry-server.tsx) supplies its own slug and gets back
// an independent { queryKey, queryFn } pair — same convention homeQueries.ts
// documents for future parameterized queries.
export const blogPostQuery = (slug: string) => ({
  queryKey: ["blog-post", slug] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) throw error;
    return data;
  },
});
