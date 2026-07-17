import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useSectionLink } from "@/hooks/useSectionLink";

// Computed once at module load rather than on every render. Note: this does not
// by itself prevent a build-time vs. hydration-time mismatch once prerendering
// (F17/F18) exists — that requires the prerender step to pass the year through
// explicitly. Revisit then; the exposure until that lands is a same-second
// year-boundary edge case with no visible effect beyond a dev console warning.
const currentYear = new Date().getFullYear();

const Footer = () => {
  const { data: profile } = useProfile();
  const { isHomePage, hashToScrollParam, scrollToSection } = useSectionLink();

  const socialLinks = [
    { icon: Github, href: profile?.github_url || "https://github.com/Flopchamp", label: "GitHub" },
    { icon: Linkedin, href: profile?.linkedin_url || "https://www.linkedin.com/in/harrison-aloo-1ba4a73a1", label: "LinkedIn" },
    { icon: Twitter, href: profile?.twitter_url || "https://twitter.com/Harriso41240001", label: "Twitter" },
    { icon: Mail, href: `mailto:${profile?.email || "alooharrison7@gmail.com"}`, label: "Email" },
  ];

  const quickLinks = [
    { name: "About", href: "#about", isHash: true },
    { name: "Projects", href: "#projects", isHash: true },
    { name: "Experience", href: "#experience", isHash: true },
    { name: "Blog", href: "/blog", isHash: false },
    { name: "Contact", href: "#contact", isHash: true },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {profile?.avatar_url && (
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name || "Profile"} />
                  <AvatarFallback className="text-sm font-bold">
                    {profile.full_name?.split(' ').map(n => n[0]).join('') || 'HA'}
                  </AvatarFallback>
                </Avatar>
              )}
              <h3 className="text-xl font-bold">
                Harrison <span className="gradient-text">Aloo</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              { "Software Engineer & Full Stack Developer building digital solutions that connect, scale, and inspire."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.isHash && isHomePage ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  ) : link.isHash ? (
                    <Link
                      to={hashToScrollParam(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="social-icon-button"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} {profile?.full_name || "Harrison Onyango Aloo"}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
