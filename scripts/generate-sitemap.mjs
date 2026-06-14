import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env for local development (Vercel sets env vars directly in CI)
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key?.trim() && vals.length) {
      process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
} catch {}

const SITE_URL = 'https://harrisononyangoaloo.vercel.app';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

async function generateSitemap() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Sitemap: failed to fetch blog posts:', error.message);
    process.exit(1);
  }

  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/',     changefreq: 'monthly', priority: '1.0', lastmod: today },
    { url: '/blog', changefreq: 'weekly',  priority: '0.8', lastmod: today },
  ];

  const blogPages = (posts ?? []).map(post => ({
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
