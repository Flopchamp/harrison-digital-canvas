-- Add an optional "Buy Me a Coffee" link to profiles, following the same
-- nullable-URL pattern already used for github_url / linkedin_url / twitter_url.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS buy_me_a_coffee_url TEXT;
