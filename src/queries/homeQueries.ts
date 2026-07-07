import { supabase } from "@/integrations/supabase/client";

// Shared queryKey + queryFn definitions for every query the homepage's
// component tree needs. Each export is consumed two ways:
//   - components: useQuery(someQuery), or useQuery({ ...someQuery, ...overrides })
//   - scripts/prerender.mjs (via src/entry-server.tsx): queryClient.prefetchQuery(someQuery)
// for the exact same route, so the server-rendered HTML contains real data
// instead of a loading skeleton.
//
// Query keys and fetch logic live here once — nothing else should inline a
// Supabase call for these. A future parameterized query (e.g. a single blog
// post by slug) should follow the same pattern as a factory function that
// returns { queryKey, queryFn } — see src/queries/blogQueries.ts once F20/F21
// need one.

export const profileQuery = {
  queryKey: ["profile"] as const,
  queryFn: async () => {
    const { data, error } = await supabase.from("profiles").select("*").single();
    if (error) {
      console.error("Error fetching profile:", error);
      // Return default/fallback data if profile doesn't exist
      return null;
    }
    return data;
  },
};

export const projectImagesQuery = {
  queryKey: ["project-images"] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, image_url, title")
      .not("image_url", "is", null)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data;
  },
};

export const educationQuery = {
  queryKey: ["education"] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (error) throw error;
    return data;
  },
};

export const projectsQuery = {
  queryKey: ["projects"] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

export const skillsQuery = {
  queryKey: ["skills"] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data;
  },
};

export const experiencesQuery = {
  queryKey: ["experiences"] as const,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true })
      .order("start_date", { ascending: false });

    if (error) throw error;
    return data;
  },
};

// Every query the "/" route needs prefetched before prerendering — lets the
// prerender script loop over one list instead of importing each query itself.
export const HOME_ROUTE_QUERIES = [
  profileQuery,
  projectImagesQuery,
  educationQuery,
  projectsQuery,
  experiencesQuery,
  skillsQuery,
];
