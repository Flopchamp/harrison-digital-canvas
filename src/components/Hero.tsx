import { Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Track the outgoing slide so the CSS cross-fade has two images to work with.
  // null on first render: only one image is in the DOM until the first transition.
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const { data: profile } = useProfile();

  const { data: projects } = useQuery({
    queryKey: ["project-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, image_url, title")
        .not("image_url", "is", null)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const backgroundImages = projects?.map((p) => p.image_url).filter(Boolean) || [];

  // Auto-advance: record the outgoing index so the fade-out image stays in the DOM
  // for the 1 s CSS transition before being unmounted.
  useEffect(() => {
    if (backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % backgroundImages.length;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Preload the next image one slide ahead of time so it is already in the
  // browser cache when the carousel advances — prevents any visible load flash.
  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    const nextIndex = (currentSlide + 1) % backgroundImages.length;
    const preloadImg = new Image();
    preloadImg.src = backgroundImages[nextIndex];
  }, [currentSlide, backgroundImages]);

  const socialLinks = [
    { icon: Github, href: profile?.github_url || "https://github.com/Flopchamp", label: "GitHub" },
    { icon: Linkedin, href: profile?.linkedin_url || "https://www.linkedin.com/in/harrison-aloo-1ba4a73a1", label: "LinkedIn" },
    { icon: Twitter, href: profile?.twitter_url || "https://twitter.com/Harriso41240001", label: "Twitter" },
    { icon: Mail, href: `mailto:${profile?.email || "alooharrison7@gmail.com"}`, label: "Email" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Sliding background images.
          Only the current and previous slide are mounted in the DOM at any time
          (max 2 of N images), so the browser never fetches all project images on
          initial load. The next slide is preloaded via JS Image() (see useEffect). */}
      {backgroundImages.map((image, index) => {
        const isCurrent = index === currentSlide;
        const isPrev = prevSlide !== null && index === prevSlide;
        if (!isCurrent && !isPrev) return null;
        return (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center section-padding">
        {/* Name and title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white drop-shadow-lg">
          {profile?.full_name ? (
            <>
              {profile.full_name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="gradient-text">{profile.full_name.split(' ').slice(-1)[0]}</span>
            </>
          ) : (
            <>Harrison Onyango <span className="gradient-text">Aloo</span></>
          )}
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-200 font-medium mb-6 drop-shadow-md">
          {profile?.title || "Software Engineer & Full Stack Developer"}
        </h2>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
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

        {/* Slide indicators */}
        {backgroundImages.length > 0 && (
          <div className="flex gap-2 justify-center mt-12">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setPrevSlide(currentSlide);
                  setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/50 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
