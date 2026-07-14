-- Skills seed — run in Supabase SQL Editor
-- Safe to re-run: deletes existing rows first then re-inserts

DELETE FROM public.skills;

INSERT INTO public.skills (name, category, display_order) VALUES
  -- Frontend
  ('React',        'Frontend', 1),
  ('TypeScript',   'Frontend', 2),
  ('JavaScript',   'Frontend', 3),
  ('Next.js',      'Frontend', 4),
  ('Vue.js',       'Frontend', 5),
  ('React Native', 'Frontend', 6),
  ('Tailwind CSS', 'Frontend', 7),
  ('HTML/CSS',     'Frontend', 8),

  -- Backend
  ('Node.js',      'Backend',  1),
  ('Python',       'Backend',  2),
  ('FastAPI',      'Backend',  3),
  ('Express.js',   'Backend',  4),
  ('Laravel',      'Backend',  5),
  ('PHP',          'Backend',  6),
  ('REST APIs',    'Backend',  7),

  -- Database
  ('PostgreSQL',   'Database', 1),
  ('Supabase',     'Database', 2),
  ('MySQL',        'Database', 3),
  ('MongoDB',      'Database', 4),

  -- Tools & DevOps
  ('Docker',          'Tools & DevOps', 1),
  ('Git/GitHub',      'Tools & DevOps', 2),
  ('Cloud Services',  'Tools & DevOps', 3),
  ('PineScript',      'Tools & DevOps', 4);

-- Verify
SELECT category, array_agg(name ORDER BY display_order) AS skills
FROM public.skills
GROUP BY category
ORDER BY category;
