-- Add New Blog Post: "How RESTful APIs Work and Why They Matter"
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
  'How RESTful APIs Work and Why They Matter',
  'how-restful-apis-work-why-they-matter',
  'RESTful APIs are a core part of modern software systems. They enable communication between applications in a standardized and scalable way.',
  'RESTful APIs are a core part of modern software systems. They enable communication between applications in a standardized and scalable way.

At a basic level, REST uses HTTP methods such as GET, POST, PUT, and DELETE to perform operations on resources. Each endpoint represents a resource, and responses are typically returned in JSON format.

Well-designed REST APIs follow principles such as statelessness, consistent naming conventions, and clear response codes. This makes them easier to understand, test, and integrate.

REST APIs matter because they allow systems to be modular. Frontend applications, mobile apps, and third-party services can all interact with the same backend without tight coupling.

Understanding RESTful principles is essential for building scalable and maintainable systems in modern software engineering.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
  ARRAY['REST API', 'Web Development', 'Backend', 'API Design', 'HTTP'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'how-restful-apis-work-why-they-matter';
