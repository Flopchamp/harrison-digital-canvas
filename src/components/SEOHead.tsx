import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  jsonLd?: object;
  noindex?: boolean;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://harrisononyangoaloo.vercel.app";
const SITE_NAME = "Harrison Onyango Aloo";
const DEFAULT_DESCRIPTION =
  "Portfolio of Harrison Onyango Aloo, a Software Engineer and Full Stack Developer based in Kenya. Specializing in React, Node.js, Supabase, and modern web technologies.";
const DEFAULT_IMAGE = `${SITE_URL}/images/profile.png`;

const SEOHead = ({
  title = `${SITE_NAME} - Software Engineer & Full Stack Developer`,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = "",
  type = "website",
  publishedTime,
  tags,
  jsonLd,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,follow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
