import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return;

          // Supabase client is ~250 kB on its own — isolate so it caches independently
          if (id.includes("@supabase")) return "vendor-supabase";

          // TanStack Query
          if (id.includes("@tanstack")) return "vendor-query";

          // All Radix UI primitives in one chunk — they change together on shadcn updates
          if (id.includes("@radix-ui")) return "vendor-radix";

          // Markdown ecosystem: react-markdown pulls in unified, micromark, mdast,
          // hast, unist, vfile, and ~15 micro-packages — group them together
          if (
            id.includes("react-markdown") ||
            id.includes("/remark") ||
            id.includes("/unified") ||
            id.includes("/micromark") ||
            id.includes("/mdast") ||
            id.includes("/hast") ||
            id.includes("/unist") ||
            id.includes("/vfile") ||
            id.includes("html-url-attributes") ||
            id.includes("property-information") ||
            id.includes("comma-separated-tokens") ||
            id.includes("space-separated-tokens") ||
            id.includes("decode-named-character-reference") ||
            id.includes("character-entities") ||
            id.includes("stringify-entities") ||
            id.includes("ccount")
          ) return "vendor-markdown";

          // Lucide ships many SVG components — separate chunk improves tree-shaking visibility
          if (id.includes("lucide-react")) return "vendor-icons";

          // date-fns is large and rarely changes
          if (id.includes("date-fns")) return "vendor-date";

          // React core — smallest, most critical, cached forever
          if (
            id.includes("/react-dom/") ||
            id.includes("/react/") ||
            id.includes("react-router") ||
            id.includes("react-helmet") ||
            id.includes("/scheduler/")
          ) return "vendor-react";
        },
      },
    },
  },
}));
