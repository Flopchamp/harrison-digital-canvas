import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about", isHash: true },
    { name: "Projects", href: "#projects", isHash: true },
    { name: "Experience", href: "#experience", isHash: true },
    { name: "Blog", href: "/blog", isHash: false },
    { name: "Contact", href: "#contact", isHash: true },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-background/50 backdrop-blur-sm border-b border-border z-50 ${
        isScrolled ? "glass-effect shadow-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity">
              Harrison <span className="gradient-text">Aloo</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash && isHomePage ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : item.isHash ? (
                    <Link
                      to={`/${item.href}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-muted-foreground hover:text-primary transition-colors ${
                        location.pathname.startsWith(item.href) ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isHash && isHomePage ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="block text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {item.name}
                    </a>
                  ) : item.isHash ? (
                    <Link
                      to={`/${item.href}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-muted-foreground hover:text-primary transition-colors py-2 ${
                        location.pathname.startsWith(item.href) ? "text-primary font-semibold" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;