-- Add New Blog Post: "Common Mistakes Junior Developers Make in Backend Development"
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
  'Common Mistakes Junior Developers Make in Backend Development',
  'common-mistakes-junior-developers-backend',
  'Backend development comes with many challenges, and junior developers often encounter similar pitfalls when starting out. Learn about the most common mistakes and how to avoid them.',
  'Backend development comes with many challenges, and junior developers often encounter similar pitfalls when starting out.

One common mistake is ignoring error handling. Assuming that everything will work as expected leads to fragile systems. Every external request, database operation, or user input can fail and must be handled gracefully.

Another mistake is hardcoding sensitive data such as API keys and database credentials. Secrets should always be stored securely using environment variables or secret managers.

Overcomplicating solutions is also common. Simple, readable code is usually better than complex implementations that are difficult to maintain and debug.

Lack of proper documentation is another issue. Clear documentation helps future developers understand how the system works and reduces onboarding time.

Avoiding these mistakes early helps developers grow faster and build more reliable backend systems.',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop',
  ARRAY['Backend', 'Best Practices', 'Junior Developers', 'Coding Tips', 'Software Engineering'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'common-mistakes-junior-developers-backend';
