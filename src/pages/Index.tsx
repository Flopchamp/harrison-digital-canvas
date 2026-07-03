import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { PERSON_ENTITY } from "@/lib/personEntity";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  ...PERSON_ENTITY,
  jobTitle: "Software Engineer & Full Stack Developer",
  image: "https://harrisononyangoaloo.vercel.app/images/profile.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  knowsAbout: ["React", "Node.js", "TypeScript", "Supabase", "Full Stack Development"],
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("scrollTo");
    if (!section) return;

    const attempt = (retries: number) => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setSearchParams({}, { replace: true });
      } else if (retries > 0) {
        setTimeout(() => attempt(retries - 1), 100);
      }
    };
    attempt(10);
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Harrison Onyango Aloo - Software Engineer & Full Stack Developer"
        description="Portfolio of Harrison Onyango Aloo, a Software Engineer and Full Stack Developer based in Kisumu, Kenya. Specializing in React, Node.js, Supabase, and modern web technologies."
        path="/"
        jsonLd={personJsonLd}
      />
      <Header/>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
