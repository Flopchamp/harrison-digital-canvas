import { useEffect, useState } from "react";


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <header className={`Fixed top-0 left-0 w-ful bg-background/50 backdrop-blur-sm border-b border-border z-50
        ${
        isScrolled
          ? "glass-effect shadow-card py-2"
          : "bg-transparent py-4"
    }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        Harrison <span className="gradient-text">Aloo</span>
                    </h1>
                    <nav>
                        <ul className="flex gap-6">
                            <li>
                                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">
                                    Experience
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default Header;