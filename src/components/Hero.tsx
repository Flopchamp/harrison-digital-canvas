import { Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/harrisononyango", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/harrisononyango", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/harrisononyango", label: "Twitter" },
    { icon: Mail, href: "mailto:harrison@example.com", label: "Email" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-50 animate-pulse" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Profile photo */}
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-50 animate-float" />
            <img
              src={profilePhoto}
              alt="Harrison Onyango Aloo"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-card shadow-lg"
            />
          </div>
        </div>

        {/* Name and title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Harrison Onyango <span className="gradient-text">Aloo</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-6">
          Software Engineer & Full Stack Developer
        </h2>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Building digital solutions that <span className="text-primary font-semibold">connect</span>, 
          <span className="text-accent font-semibold"> scale</span>, and 
          <span className="gradient-text font-semibold"> inspire</span>
        </p>

        {/* Social links */}
        <div className="flex gap-4 justify-center mb-12">
          {socialLinks.map((social) => (
            <Button
              key={social.label}
              variant="outline"
              size="icon"
              className="glass-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              asChild
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            </Button>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-card hover:bg-card/50"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
