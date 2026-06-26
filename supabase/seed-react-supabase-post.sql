-- Blog Post: "Build a Full-Stack App with React and Supabase"
-- Run this in your Supabase SQL Editor to add this blog post

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
  'Build a Full-Stack App with React and Supabase',
  'react-supabase-tutorial',
  'A complete tutorial on building a full-stack React and TypeScript application with Supabase — covering database setup, Row Level Security, authentication, React Query data fetching, real-time subscriptions, and Vercel deployment.',
  '# Build a Full-Stack App with React and Supabase

Supabase is an open-source Firebase alternative that gives you a PostgreSQL database, authentication, real-time subscriptions, and file storage — all with a generous free tier. Paired with React, it lets you ship production-grade full-stack apps without managing a backend server.

In this tutorial we''ll build a task management app from scratch: React + TypeScript on the frontend, Supabase as the entire backend.

## What We''re Building

- Email and password authentication
- A tasks table with per-user Row Level Security
- Real-time updates across browser tabs
- Deployed to Vercel in minutes

## Prerequisites

- Node.js 18+
- A free Supabase account at [supabase.com](https://supabase.com)
- Basic knowledge of React and TypeScript

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon public key** from Settings → API
3. Open the SQL Editor and run:

```sql
CREATE TABLE tasks (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title      TEXT NOT NULL,
    completed  BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tasks"
ON tasks FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

Row Level Security means even if someone gets your anon key, they can only access their own rows — enforced at the database level, not in your app code.

## Step 2: Set Up React

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @supabase/supabase-js @tanstack/react-query
```

Create `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from ''@supabase/supabase-js'';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

## Step 3: Authentication

Supabase handles the full auth flow — sign up, sign in, sessions, and token refresh automatically:

```typescript
// Sign up
const { error } = await supabase.auth.signUp({ email, password });

// Sign in
const { error } = await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === ''SIGNED_IN'') setUser(session?.user ?? null);
  if (event === ''SIGNED_OUT'') setUser(null);
});
```

## Step 4: Fetch Data with React Query

Create `src/hooks/useTasks.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from ''@tanstack/react-query'';
import { supabase } from ''../lib/supabase'';

export function useTasks() {
  return useQuery({
    queryKey: [''tasks''],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(''tasks'')
        .select(''*'')
        .order(''created_at'', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from(''tasks'')
        .insert({ title, user_id: user!.id });

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [''tasks''] }),
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await supabase
        .from(''tasks'')
        .update({ completed })
        .eq(''id'', id);

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [''tasks''] }),
  });
}
```

## Step 5: Real-Time Updates

Supabase can push database changes to your UI the moment they happen — across all open tabs:

```typescript
import { useEffect } from ''react'';
import { useQueryClient } from ''@tanstack/react-query'';
import { supabase } from ''../lib/supabase'';

export function useRealtimeTasks() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(''tasks-changes'')
      .on(
        ''postgres_changes'',
        { event: ''*'', schema: ''public'', table: ''tasks'' },
        () => {
          queryClient.invalidateQueries({ queryKey: [''tasks''] });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);
}
```

Call `useRealtimeTasks()` in your tasks component. Every insert, update, or delete now instantly refreshes the UI.

## Step 6: Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Redeploy and your full-stack app is live.

## Supabase vs Firebase

| Feature | Supabase | Firebase |
|---|---|---|
| Database | PostgreSQL (relational) | Firestore (NoSQL) |
| Open source | Yes | No |
| Self-hostable | Yes | No |
| Free tier | 500MB, 2 projects | 1GB Firestore |
| Real-time | Yes | Yes |
| TypeScript types | Auto-generated | Manual |

If you know SQL and need relational data, Supabase wins every time.

## Conclusion

Supabase eliminates the need to build and maintain an API server. Row Level Security handles authorization at the database level, the JS client handles auth, and React Query manages server state cleanly. Together they cover everything needed to ship a production app fast.

This is the exact stack powering this portfolio — the blog posts, projects, and experience sections you see here are all live data from Supabase.',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  ARRAY['React', 'Supabase', 'TypeScript', 'Full Stack', 'Tutorial'],
  true,
  NOW(),
  NOW()
);

-- Verify the post was created
SELECT id, title, slug, published, created_at FROM public.blog_posts WHERE slug = 'react-supabase-tutorial';
