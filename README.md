# Harrison Aloo — Digital Canvas

A modern, responsive portfolio website showcasing my work as a Software Engineer & Full Stack Developer.

## ✨ Features

- **Hero Section** — Animated introduction with call-to-action
- **About** — Background, skills, and personal summary
- **Projects** — Showcase of featured work with live links
- **Experience** — Professional timeline and achievements
- **Blog** — Dynamic blog powered by Supabase with full post pages
- **Contact** — Get-in-touch form with email notifications
- **Dark / Light Mode** — Theme toggle with local storage persistence
- **Fully Responsive** — Optimised for mobile, tablet, and desktop

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build Tool | [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| Backend / DB | [Supabase](https://supabase.com) (Postgres, Edge Functions) |
| Data Fetching | [TanStack React Query](https://tanstack.com/query) |
| Routing | [React Router](https://reactrouter.com) |
| Icons | [Lucide React](https://lucide.dev) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- npm, yarn, or [bun](https://bun.sh)

### Installation

```sh
# Clone the repository
git clone https://github.com/Flopchamp/harrison-digital-canvas.git

# Navigate into the project
cd harrison-digital-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI and section components
│   └── ui/         # shadcn/ui primitives
├── hooks/          # Custom React hooks
├── integrations/   # Supabase client & types
├── lib/            # Utility functions
├── pages/          # Route-level page components
└── assets/         # Static assets
supabase/
├── migrations/     # Database migrations
├── functions/      # Edge functions (e.g. contact notifications)
└── seed-*.sql      # Seed data for blog posts, profile, projects
```

## 🌐 Deployment

Build the project and deploy the `dist/` folder to any static hosting provider:

```sh
npm run build
```

Compatible with **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**, and more.

## 📄 License

© Harrison Onyango Aloo. All rights reserved.
