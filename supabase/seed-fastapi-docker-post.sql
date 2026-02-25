-- Add New Blog Post: "Strengthening My Backend Engineering Skills with FastAPI and Docker"
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
  'Strengthening My Backend Engineering Skills with FastAPI and Docker',
  'strengthening-backend-engineering-skills-fastapi-docker',
  'Exploring how FastAPI and Docker have strengthened my backend development skills, improved architecture design, and introduced production-ready engineering practices.',
  'As I continue growing as a software engineer, I have been focusing heavily on backend development using Python, FastAPI, and Docker. My goal is not just to build APIs, but to understand how backend systems are structured and prepared for real-world production environments.

FastAPI has helped me design cleaner and more efficient APIs. With its asynchronous capabilities, automatic documentation, and strong data validation through type hints, I am learning to build well-structured backend services that are both scalable and maintainable.

Beyond writing endpoints, I now focus on separation of concerns, proper error handling, dependency management, and consistent response models. These practices significantly improve system reliability and long-term maintainability.

Learning Docker has shifted my perspective from “it works on my machine” to building applications that run consistently across environments. Containerization ensures that dependencies, configurations, and runtime environments remain stable from development to deployment.

Through Docker, I am gaining experience in writing optimized Dockerfiles, managing environment variables securely, handling container networking, and preparing services for cloud deployment.

This journey is strengthening not only my backend development skills but also my understanding of DevOps fundamentals and production-ready engineering.

Next, I am focusing on deploying containerized FastAPI services to the cloud, implementing CI/CD pipelines, and integrating monitoring and logging strategies to build more resilient systems.

Backend development is a continuous learning process, and every project moves me closer to building scalable, secure, and reliable systems.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
  ARRAY['Python', 'FastAPI', 'Docker', 'Backend Development', 'DevOps', 'Software Engineering'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at 
FROM public.blog_posts 
WHERE slug = 'strengthening-backend-engineering-skills-fastapi-docker';