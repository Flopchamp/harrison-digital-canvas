-- Remove the foreign key constraint that requires auth.users
-- This allows profiles to exist without authentication
-- Perfect for single-user portfolios

-- Drop the foreign key constraint
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Make id a regular UUID (not linked to auth.users)
ALTER TABLE public.profiles 
ALTER COLUMN id DROP DEFAULT;

-- Optionally, if you want id to auto-generate:
-- ALTER TABLE public.profiles 
-- ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Verify the change
\d public.profiles;
