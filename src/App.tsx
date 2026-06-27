import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ErrorBoundary from "./components/ErrorBoundary";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Lazy-load every page so each route is a separate JS chunk.
// The blog routes (Blog, BlogPost) pull in react-markdown + the full unified/micromark
// ecosystem (~100 kB gzip). With lazy loading those bytes only download when the
// user first navigates to /blog — homepage visitors never pay that cost.
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Portfolio data (projects, blog posts, profile) is CMS content that changes
      // at most a few times per day. Treat it as fresh for 5 minutes so React Query
      // does not refetch on every window-focus or component remount.
      staleTime: 1000 * 60 * 5,   // 5 minutes
      gcTime: 1000 * 60 * 10,     // 10 minutes — keep in memory while navigating
      retry: 1,                    // one retry on network failure, then surface the error
    },
  },
});

// Minimal fallback: same background color so there is no white flash between
// the static HTML shell and the first painted React frame.
const PageFallback = () => <div className="min-h-screen bg-background" />;

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          {/* Suspense boundary catches lazy page suspensions.
              WhatsAppFloat lives outside so it never disappears during navigation. */}
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppFloat />
        </ErrorBoundary>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
