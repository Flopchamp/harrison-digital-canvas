import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  // The static dist/404.html artifact (scripts/prerender.mjs) is always built
  // from the literal URL "/404" and served for whatever real broken path a
  // visitor actually hit. Rendering the true location.pathname here on first
  // paint would mismatch the server's baked-in "/404" text and trigger a
  // hydration failure that discards the whole prerendered page. Match the
  // server's placeholder first, then correct it once mounted — same pattern
  // as ThemeToggle's SSR-safe default.
  const [displayPath, setDisplayPath] = useState("/404");

  useEffect(() => {
    setDisplayPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="404 – Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex
      />
      <Header />

      <main className="flex-1 flex items-center justify-center section-padding">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-10 leading-relaxed">
            The page <span className="text-primary font-medium">{displayPath}</span> doesn't
            exist or has been moved.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              asChild
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button variant="outline" className="glass-card" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
