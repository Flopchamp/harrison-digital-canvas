import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env for local development (Vercel sets env vars directly in CI/build).
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key?.trim() && vals.length) {
      process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
} catch {}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

/**
 * Every published blog post's slug + timestamps — the single source of truth
 * for "what blog routes actually exist right now." Used today by the sitemap
 * generator, and from F17 onward by the prerender route-enumeration step and
 * the 404 routing middleware, so none of them can drift into a different
 * answer to the same question.
 *
 * Throws on failure rather than calling process.exit(): not every future
 * caller is a standalone Node build script, so the decision of how to react
 * to a failed fetch belongs to the caller.
 */
export async function fetchPublishedSlugs() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch published blog post slugs: ${error.message}`);
  }

  return data ?? [];
}
