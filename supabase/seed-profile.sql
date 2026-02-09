-- Seed Profile Data
-- Run this in your Supabase SQL Editor to populate your profile

-- ============================================================================
-- OPTION A: CREATE A USER AND GET THE ID
-- ============================================================================
-- 
-- STEP 1: Create a user in the auth.users table
-- Run this SQL to create your user:
--
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  aud,
  role
) VALUES (
  gen_random_uuid(), -- This generates your user ID
  '00000000-0000-0000-0000-000000000000',
  'alooharrison7@gmail.com',
  crypt('YourSecurePassword123!', gen_salt('bf')), -- Change this password!
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  'authenticated',
  'authenticated'
);
--
-- STEP 2: Get your user ID
-- After running the above, run this to see your user ID:
--
SELECT id, email FROM auth.users;
--
-- Copy the UUID from the 'id' column
--
-- STEP 3: Replace 'YOUR_USER_ID_HERE' below with that UUID
-- Then run the INSERT statement below
--
-- ============================================================================
-- OPTION B (EASIER): Just drop the constraint (no auth needed)
-- ============================================================================
-- Run this single line instead:
--
-- ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
--
-- Then use UUID: 00000000-0000-0000-0000-000000000001 (already set below)
-- ============================================================================

-- ============================================================================
-- ALTERNATIVE: Use Table Editor (after running STEP 1)
-- ============================================================================
-- 1. Go to Supabase Dashboard → Table Editor → profiles
-- 2. Click "Insert" → "Insert row"
-- 3. Fill in:
--    
--    • id: 00000000-0000-0000-0000-000000000001
--           (Just copy this - no user ID needed!)
--    
--    • full_name: "Harrison Onyango Aloo"
--    
--    • title: "Software Engineer & Full Stack Developer"
--    
--    • bio: (paste the bio text below - supports multiple lines)
--           "I'm a passionate Software Engineer and Full Stack Developer..."
--    
--    • avatar_url: (optional) Leave empty or add image URL
--           Example: "https://avatars.githubusercontent.com/u/yourusername"
--    
--    • github_url: "https://github.com/Flopchamp"
--    
--    • linkedin_url: "https://www.linkedin.com/in/harrison-aloo-1ba4a73a1"
--    
--    • twitter_url: "https://twitter.com/harrisononyango"
--    
--    • email: "alooharrison7@gmail.com"
--    
--    • location: "Kisumu, Kenya"
--    
--    • created_at: (auto-filled, don't change)
--    
--    • updated_at: (auto-filled, don't change)
--
-- 7. Click "Save" at the bottom of the form
-- 8. Your profile will appear in the table - refresh your website to see changes!
--
-- ============================================================================

-- ============================================================================
-- NOW YOU CAN INSERT YOUR PROFILE
-- ============================================================================
-- If you used OPTION A: Replace 'YOUR_USER_ID_HERE' with the UUID from auth.users
-- If you used OPTION B: Use the fixed UUID below (already set)
-- ============================================================================

-- Insert or update profile data
INSERT INTO public.profiles (
  id,
  full_name,
  title,
  bio,
  avatar_url,
  github_url,
  linkedin_url,
  twitter_url,
  email,
  location
) VALUES (
  '88d6f1f9-3f97-4476-bd27-af6734293ec8', -- Your user ID from auth.users
  'Harrison Onyango Aloo',
  'Software Engineer & Full Stack Developer',
  'I''m a passionate Software Engineer and Full Stack Developer based in Kenya, with a deep love for creating innovative digital solutions that make a real impact.

With expertise spanning frontend and backend technologies, I specialize in building scalable web applications using modern frameworks and cloud technologies.

My approach combines technical excellence with user-centric design, ensuring that every project I work on is both powerful and accessible.',
  NULL, -- Add your avatar URL here if you have one
  'https://github.com/Flopchamp',
  'https://www.linkedin.com/in/harrison-aloo-1ba4a73a1',
  'https://twitter.com/harrisononyango',
  'alooharrison7@gmail.com',
  'Kisumu, Kenya'
)
ON CONFLICT (id) 
DO UPDATE SET
  full_name = EXCLUDED.full_name,
  title = EXCLUDED.title,
  bio = EXCLUDED.bio,
  avatar_url = EXCLUDED.avatar_url,
  github_url = EXCLUDED.github_url,
  linkedin_url = EXCLUDED.linkedin_url,
  twitter_url = EXCLUDED.twitter_url,
  email = EXCLUDED.email,
  location = EXCLUDED.location,
  updated_at = NOW();

-- ============================================================================
-- VERIFY YOUR PROFILE WAS CREATED
-- ============================================================================
-- Run these queries one by one to check if your profile exists:

-- Query 1: Check if profile exists
SELECT * FROM public.profiles;

-- Query 2: Check specific fields
SELECT full_name, email, location FROM public.profiles;

-- Query 3: Count profiles (should show 1)
SELECT COUNT(*) as total_profiles FROM public.profiles;
