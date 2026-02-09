-- Seed Blog Posts
-- Run this in your Supabase SQL Editor to populate sample blog posts

-- ============================================================================
-- INSERT SAMPLE BLOG POSTS
-- ============================================================================
-- These are sample blog posts to get you started.
-- You can modify them or add your own posts.
-- ============================================================================

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
) VALUES 
(
  'Building Modern Web Applications with React and TypeScript',
  'building-modern-web-applications-react-typescript',
  'Discover how TypeScript enhances React development with type safety, better tooling, and improved code quality. Learn best practices for structuring your projects.',
  'TypeScript has become an essential tool in modern web development, especially when working with React. In this comprehensive guide, I''ll share my experiences and best practices for building robust web applications.

## Why TypeScript?

Type safety isn''t just about catching errors early—it''s about building more maintainable and scalable applications. With TypeScript, you get:

- **Autocomplete and IntelliSense**: Your IDE becomes much more powerful
- **Refactoring confidence**: Rename variables and functions without fear
- **Better documentation**: Types serve as inline documentation
- **Fewer runtime errors**: Catch bugs at compile time

## Setting Up Your Project

When starting a new React + TypeScript project, I recommend using Vite:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

## Type Safety Best Practices

1. **Define explicit types for props**: Always type your component props
2. **Use interfaces over types**: Especially for object shapes
3. **Leverage utility types**: React.FC, ReturnType, Omit, Pick, etc.
4. **Avoid `any`**: Use `unknown` if you really don''t know the type

## State Management

When managing state in TypeScript, consider using custom hooks with proper typing. This keeps your components clean and your state management type-safe.

## Conclusion

TypeScript and React are a powerful combination. The initial learning curve is worth the long-term benefits of maintainability, scalability, and developer experience.',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  ARRAY['React', 'TypeScript', 'Web Development', 'Frontend'],
  true,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days'
),
(
  'Supabase: The Open Source Firebase Alternative',
  'supabase-open-source-firebase-alternative',
  'Explore Supabase, a powerful backend-as-a-service platform that provides authentication, database, storage, and real-time subscriptions. Perfect for rapid development.',
  'Supabase has revolutionized how I build full-stack applications. It provides all the backend services you need without the complexity of managing your own infrastructure.

## What is Supabase?

Supabase is an open-source Backend-as-a-Service (BaaS) that provides:

- **PostgreSQL Database**: Full-featured relational database
- **Authentication**: Built-in auth with multiple providers
- **Storage**: File storage with CDN
- **Real-time**: Subscribe to database changes
- **Edge Functions**: Serverless functions on the edge

## Why I Choose Supabase

Coming from Firebase, I was looking for something with more flexibility and better SQL support. Supabase checked all the boxes:

### PostgreSQL Power
Unlike Firebase''s NoSQL database, Supabase uses PostgreSQL, which means:
- Complex queries and joins
- Full ACID compliance
- Powerful extensions (PostGIS, pg_vector, etc.)
- Row Level Security (RLS) for fine-grained access control

### Developer Experience
The developer experience is outstanding:
- Intuitive dashboard
- Auto-generated APIs
- TypeScript type generation
- Excellent documentation

## Getting Started

Setting up Supabase in your project is straightforward:

```bash
npm install @supabase/supabase-js
```

Then initialize the client with your project URL and anon key.

## Real-Time Features

One of my favorite features is the real-time subscriptions. You can listen to database changes and update your UI automatically.

## Security with RLS

Row Level Security is a game-changer. You define policies at the database level, ensuring data security regardless of how clients access your database.

## Conclusion

Supabase combines the ease of Firebase with the power of PostgreSQL. If you''re building a new project or considering migrating from Firebase, Supabase is definitely worth exploring.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
  ARRAY['Supabase', 'Backend', 'PostgreSQL', 'Database'],
  true,
  NOW() - INTERVAL '12 days',
  NOW() - INTERVAL '12 days'
),
(
  'Mastering Tailwind CSS: Tips and Tricks',
  'mastering-tailwind-css-tips-tricks',
  'Learn advanced Tailwind CSS techniques to build beautiful, responsive interfaces faster. From custom configurations to performance optimization.',
  'Tailwind CSS has transformed how I approach styling in web applications. Here are some advanced tips and tricks I''ve learned along the way.

## Why Tailwind?

Utility-first CSS might seem verbose at first, but the benefits are significant:

- **Rapid development**: Build interfaces without leaving your HTML
- **Consistency**: Design system built-in
- **No CSS bloat**: Only the styles you use are included
- **Responsive by default**: Mobile-first approach

## Custom Configuration

Your `tailwind.config.js` is powerful. Here''s what I customize:

### Colors
Extend the default palette with your brand colors. Use semantic names for better maintainability.

### Spacing
Add custom spacing values that match your design system. Consistency is key.

### Breakpoints
Adjust breakpoints to match your target devices and layouts.

## Advanced Patterns

### Component Extraction
Don''t be afraid to extract repeated patterns into components. Tailwind''s `@apply` directive is useful, but prefer composition when possible.

### Dark Mode
Tailwind''s dark mode support is excellent. Use `dark:` variants to create seamless theme switching.

### Animations
Custom animations with Tailwind are straightforward. Define keyframes in your config and use them with the `animate-` utilities.

## Performance Optimization

### JIT Mode
The Just-In-Time compiler generates styles on-demand, resulting in faster build times and smaller CSS files.

### Purging
Always configure content purging properly. This ensures unused styles are removed in production.

### Class Sorting
Use plugins like `prettier-plugin-tailwindcss` to automatically sort classes in a consistent order.

## Common Patterns

Here are some patterns I use frequently:

1. **Card components**: Combine shadow, padding, and rounded corners
2. **Button variants**: Use group utilities for hover effects
3. **Grid layouts**: Leverage CSS Grid utilities for complex layouts
4. **Transitions**: Add smooth transitions to interactive elements

## Integration with Component Libraries

Tailwind works great with component libraries like shadcn/ui. The combination gives you:
- Pre-built accessible components
- Full customization through Tailwind utilities
- Consistent design language

## Conclusion

Tailwind CSS rewards investment in learning. Start with the basics, gradually adopt advanced patterns, and watch your development velocity increase.',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=600&fit=crop',
  ARRAY['CSS', 'Tailwind', 'Design', 'Frontend'],
  true,
  NOW() - INTERVAL '20 days',
  NOW() - INTERVAL '20 days'
),
(
  'Understanding React Query for Server State Management',
  'understanding-react-query-server-state',
  'React Query (TanStack Query) simplifies data fetching, caching, and synchronization. Learn how to manage server state effectively in your React applications.',
  'Managing server state in React applications can be challenging. React Query (now TanStack Query) makes it effortless.

## What is React Query?

React Query is a data-fetching and state management library that handles:

- **Data fetching**: Automatic loading states
- **Caching**: Smart caching strategies
- **Background updates**: Keep data fresh automatically
- **Deduplication**: Avoid redundant requests
- **Pagination and infinite scroll**: Built-in support

## Why Not Just useState?

Traditional state management with `useState` and `useEffect` becomes complex quickly:

- Manual loading state management
- No automatic caching
- Race condition handling
- Stale data problems
- Complex error handling

React Query solves all of these problems elegantly.

## Basic Usage

The core hook is `useQuery`:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});
```

That''s it! React Query handles loading states, errors, and caching automatically.

## Advanced Features

### Mutations
For creating, updating, or deleting data:

```typescript
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries(["posts"]);
  },
});
```

### Optimistic Updates
Update the UI immediately before the server responds. React Query will roll back on error.

### Prefetching
Prefetch data before users need it for instant navigation.

### Infinite Queries
Built-in support for pagination and infinite scroll patterns.

## Best Practices

1. **Use meaningful query keys**: They''re used for caching and invalidation
2. **Configure stale time**: Balance freshness with performance
3. **Handle errors gracefully**: Provide good error UX
4. **Use devtools**: The React Query devtools are invaluable

## Integration with TypeScript

React Query works beautifully with TypeScript. Type your query functions and get full type safety throughout your components.

## Performance Considerations

React Query is highly optimized:
- Automatic request deduplication
- Smart refetching strategies
- Configurable cache times
- Garbage collection for unused queries

## Conclusion

React Query has become an essential tool in my React development workflow. It eliminates entire categories of bugs and makes data fetching code much more maintainable.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
  ARRAY['React', 'React Query', 'State Management', 'API'],
  true,
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '30 days'
),
(
  'Building Responsive UIs with Modern CSS',
  'building-responsive-uis-modern-css',
  'Master modern CSS techniques for creating responsive, accessible interfaces. From CSS Grid to Container Queries, learn what''s possible with today''s CSS.',
  'CSS has evolved tremendously in recent years. Modern CSS provides powerful tools for building responsive interfaces without relying heavily on JavaScript.

## CSS Grid vs Flexbox

Understanding when to use Grid vs Flexbox is crucial:

### Use Grid for:
- Two-dimensional layouts
- Complex page layouts
- Overlapping elements
- Precise positioning

### Use Flexbox for:
- One-dimensional layouts
- Navigation bars
- Card layouts
- Centering content

Often, you''ll use both in the same project. Grid for the overall layout, Flexbox for component internals.

## Container Queries

Container queries are a game-changer for component-based design. Style components based on their container size, not the viewport.

This enables truly modular components that adapt to their context, not just the screen size.

## CSS Custom Properties

CSS variables (custom properties) bring dynamic styling to CSS:

- Theme switching
- Responsive typography
- Consistent spacing
- Dynamic colors

They integrate seamlessly with JavaScript, enabling powerful interactions.

## Modern Responsive Typography

Clamp() makes responsive typography simple:

```css
font-size: clamp(1rem, 2vw + 1rem, 3rem);
```

This creates fluid typography that scales smoothly between minimum and maximum sizes.

## CSS Logical Properties

Logical properties are crucial for internationalization:

- `margin-inline-start` instead of `margin-left`
- `padding-block-end` instead of `padding-bottom`

They work correctly in both LTR and RTL languages.

## Accessibility Considerations

Modern CSS includes features for better accessibility:

- `prefers-reduced-motion`: Respect user preferences
- Focus-visible: Style focus only when appropriate
- Color-scheme: Support dark mode properly

## Performance

CSS performance matters:

- Use `contain` for optimization hints
- Leverage `will-change` sparingly
- Avoid expensive properties (box-shadow on scroll, etc.)
- Use transform and opacity for animations

## Browser Support

Check caniuse.com, but modern CSS features have excellent support:
- CSS Grid: 95%+ global support
- Custom properties: 97%+ support
- Container queries: Growing rapidly

## Conclusion

Modern CSS is powerful enough to handle most responsive design challenges. Take time to learn these features—they''ll make you a more effective developer.',
  'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=1200&h=600&fit=crop',
  ARRAY['CSS', 'Responsive Design', 'Web Development', 'Accessibility'],
  true,
  NOW() - INTERVAL '45 days',
  NOW() - INTERVAL '45 days'
);

-- ============================================================================
-- VERIFY YOUR BLOG POSTS WERE CREATED
-- ============================================================================
-- Run these queries to check if your blog posts exist:

-- Query 1: Check all blog posts
SELECT id, title, slug, published, created_at FROM public.blog_posts ORDER BY created_at DESC;

-- Query 2: Count total posts
SELECT COUNT(*) as total_posts FROM public.blog_posts;

-- Query 3: Check published posts only
SELECT title, excerpt, tags FROM public.blog_posts WHERE published = true;

-- ============================================================================
-- UPDATING BLOG POSTS (OPTIONAL)
-- ============================================================================
-- To update a blog post, use:
--
-- UPDATE public.blog_posts 
-- SET 
--   title = 'New Title',
--   content = 'New content...',
--   updated_at = NOW()
-- WHERE slug = 'your-post-slug';
--
-- ============================================================================

-- ============================================================================
-- CREATING YOUR OWN BLOG POST
-- ============================================================================
-- Use this template to add your own posts:
--
-- INSERT INTO public.blog_posts (
--   title,
--   slug,
--   excerpt,
--   content,
--   cover_image_url,
--   tags,
--   published,
--   created_at,
--   updated_at
-- ) VALUES (
--   'Your Post Title',
--   'your-post-slug',  -- Use kebab-case, must be unique
--   'A brief summary of your post...',
--   'Full content of your post here. You can use line breaks and format as needed.',
--   'https://images.unsplash.com/photo-xxxxx',  -- Optional cover image
--   ARRAY['Tag1', 'Tag2', 'Tag3'],  -- Your tags
--   true,  -- Set to false for drafts
--   NOW(),
--   NOW()
-- );
--
-- ============================================================================

-- ============================================================================
-- TIPS FOR WRITING BLOG POSTS
-- ============================================================================
-- 
-- 1. SLUG FORMAT
--    - Use kebab-case (lowercase with hyphens)
--    - Must be unique (used in URL)
--    - Example: "my-awesome-blog-post"
--
-- 2. EXCERPT
--    - Keep it between 100-200 characters
--    - Summarize the main point
--    - Shows on blog listing page
--
-- 3. CONTENT
--    - Use \n\n for paragraph breaks
--    - Use '' to escape single quotes
--    - Can include markdown-style headers (##)
--    - Line breaks preserved with whitespace-pre-line
--
-- 4. COVER IMAGES
--    - Recommended size: 1200x600px
--    - Use Unsplash for free images
--    - Can be NULL (optional)
--
-- 5. TAGS
--    - Use ARRAY['Tag1', 'Tag2'] syntax
--    - Keep between 3-5 tags per post
--    - Use consistent capitalization
--
-- 6. PUBLISHED FLAG
--    - Set to true for published posts
--    - Set to false for drafts (won't show on site)
--
-- ============================================================================
