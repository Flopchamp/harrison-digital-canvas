import { useLocation } from "react-router-dom";

/**
 * Shared logic for nav items that point at an in-page section (e.g. "#about").
 * On the homepage they scroll smoothly to the section; anywhere else they need
 * to route back to "/" first and ask Index to scroll once it mounts.
 */
export const useSectionLink = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const hashToScrollParam = (href: string) => `/?scrollTo=${href.replace("#", "")}`;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return { isHomePage, hashToScrollParam, scrollToSection };
};
