-- Add New Project: Nganyaapp - Fleet Management Platform
-- Run this in your Supabase SQL Editor to add your new project

INSERT INTO public.projects (
  title,
  description,
  long_description,
  image_url,
  demo_url,
  github_url,
  tech_stack,
  display_order
) VALUES (
  'Nganyaapp—Fleet Management & Booking Platform',
  'Nganyaapp is an all-in-one fleet management, booking, and tracking platform designed for modern transport companies. I contributed to the development of core features during my internship, focusing on system functionality, performance, and usability.',
  'Nganyaapp is a comprehensive transport management solution designed to help fleet operators streamline vehicle tracking, bookings, and staff coordination. During my internship, I worked as a Software Engineering Intern contributing to the development and improvement of key system components.

My responsibilities included building and enhancing parts of the driver and admin portals, integrating backend APIs, and supporting real-time data workflows for trip management and notifications. I collaborated closely with senior engineers using Git-based workflows and Agile practices, participated in debugging and testing, and helped optimize application performance and reliability.

Due to confidentiality, implementation details are presented at a high level. This project strengthened my experience in full-stack development, scalable system design, and working within production-grade transport technology platforms.',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=600&fit=crop',
  NULL,  -- Add demo URL if you have one
  NULL,  -- Add GitHub URL if you have one (might be private)
  ARRAY['Vue.js', 'TypeScript', 'Supabase', 'Fleet Management', 'Real-time Systems'],
  1  -- Change this to set the display order (1 = first, 2 = second, etc.)
);

-- Verify the project was created
SELECT id, title, tech_stack, display_order FROM public.projects WHERE title LIKE '%Nganyaapp%';

-- Optional: Update display order of other projects
-- If you want this project to appear at a specific position, you may need to update other projects' display_order
-- For example, to make this the first project (position 1), increment others:
-- UPDATE public.projects SET display_order = display_order + 1 WHERE display_order >= 1 AND title != 'Nganyaapp—Fleet Management & Booking Platform';
