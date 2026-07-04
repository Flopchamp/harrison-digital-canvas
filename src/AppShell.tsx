import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import WhatsAppFloat from "./components/WhatsAppFloat";

/**
 * Everything the app renders that isn't the router or the route table itself —
 * shared between the client entry (src/App.tsx, BrowserRouter + lazy routes)
 * and the prerender entry (src/entry-server.tsx, StaticRouter + direct-import
 * routes, since renderToString can't wait on a pending lazy()/Suspense).
 *
 * Deliberately excludes Analytics/SpeedInsights and the QueryClient/Helmet
 * providers: those differ meaningfully between client and server (real user
 * telemetry vs. a build-time render; a prefetched, dehydrated cache vs. a
 * plain client-side cache) and are composed by each entry point itself.
 */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <ErrorBoundary>
      {children}
      <WhatsAppFloat />
    </ErrorBoundary>
  </TooltipProvider>
);
