-- Add New Blog Post: "Lessons I Learned Building Real-World Backend Systems"
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
  'Lessons I Learned Building Real-World Backend Systems',
  'lessons-learned-building-backend-systems',
  'Building real-world backend systems taught me that writing code is only part of the job. The real challenge lies in designing systems that are reliable, scalable, and easy to maintain.',
  'Building real-world backend systems taught me that writing code is only part of the job. The real challenge lies in designing systems that are reliable, scalable, and easy to maintain.

One key lesson is the importance of proper API design. Clear endpoints, consistent responses, and proper error handling make systems easier to integrate and debug. Poor API design quickly becomes technical debt.

Another lesson is database planning. Choosing the right data model early helps avoid performance issues later. Indexing, normalization, and understanding query patterns are critical for scalable systems.

I also learned that logging and monitoring are not optional. Without proper logs, diagnosing issues in production becomes guesswork. Implementing structured logging and health checks significantly improves system reliability.

Finally, security must be considered from the beginning. Input validation, authentication, authorization, and secure environment configuration are essential for protecting both users and data.

Real-world projects have reinforced that good backend engineering is about thoughtful design, not just writing code that works.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
  ARRAY['Backend', 'Systems Design', 'API', 'Database', 'Security'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'lessons-learned-building-backend-systems';
