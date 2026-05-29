import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harrison Onyango Aloo",
  jobTitle: "Software Engineer & Full Stack Developer",
  url: "https://harrisononyangoaloo.vercel.app",
  image: "https://harrisononyangoaloo.vercel.app/images/profile.png",
  sameAs: [
    "https://github.com/Flopchamp",
    "https://linkedin.com/in/harrison-aloo",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kisumu",
    addressCountry: "KE",
  },
  knowsAbout: ["React", "Node.js", "TypeScript", "Supabase", "Full Stack Development"],
};

const Index = () => {
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
