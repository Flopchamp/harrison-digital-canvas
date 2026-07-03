import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fetchPublishedSlugs } from './lib/fetch-published-slugs.mjs';

const SITE_URL = 'https://harrisononyangoaloo.vercel.app';

async function generateSitemap() {
  let posts;
  try {
    posts = await fetchPublishedSlugs();
  } catch (error) {
    console.error('Sitemap:', error.message);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/',     changefreq: 'monthly', priority: '1.0', lastmod: today },
    { url: '/blog', changefreq: 'weekly',  priority: '0.8', lastmod: today },
  ];

  const blogPages = posts.map(post => ({
    url:        `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority:   '0.7',
    lastmod:    (post.updated_at ?? post.created_at ?? today).split('T')[0],
  }));

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), xml);
  console.log(`Sitemap: generated ${allPages.length} URLs (${blogPages.length} blog posts)`);
}

generateSitemap();
