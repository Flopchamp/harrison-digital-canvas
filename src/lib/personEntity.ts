// Single source of truth for the author entity referenced across every JSON-LD
// block on the site — the homepage's Person schema and every post's
// Article.author/publisher — so they can never drift into different url/sameAs
// values for what is meant to be the same disambiguated entity.
export const PERSON_ENTITY = {
  name: "Harrison Onyango Aloo",
  url: "https://harrisononyangoaloo.vercel.app",
  sameAs: [
    "https://github.com/Flopchamp",
    "https://linkedin.com/in/harrison-aloo",
  ],
};
