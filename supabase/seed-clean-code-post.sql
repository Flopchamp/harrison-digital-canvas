-- Add New Blog Post: "Why Clean Code Is Critical in Software Engineering"
-- Run this in your Supabase SQL Editor to add your new blog post

INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  tags,
  published,
  created_at,
  updated_at
) VALUES (
  'Why Clean Code Is Critical in Software Engineering',
  'why-clean-code-is-critical-software-engineering',
  'Clean code is not about writing perfect code, but about writing code that is easy to read, understand, and maintain. Learn why it matters for long-term project success.',
  'Clean code is not about writing perfect code, but about writing code that is easy to read, understand, and maintain.

In real-world projects, code is read far more often than it is written. Poorly structured code increases bugs, slows development, and makes collaboration difficult.

Using meaningful variable names, consistent formatting, and clear function responsibilities improves readability. Small, focused functions are easier to test and debug.

Clean code also reduces technical debt. When systems evolve, clean code allows developers to add features without breaking existing functionality.

Adopting clean code practices early in your career builds strong engineering habits and leads to better long-term project outcomes.',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=600&fit=crop',
  ARRAY['Clean Code', 'Best Practices', 'Software Engineering', 'Code Quality', 'Development'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'why-clean-code-is-critical-software-engineering';
