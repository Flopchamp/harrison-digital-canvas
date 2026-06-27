-- Update existing Smart Garbage project → Kenya Bin Buddy
-- Run this in your Supabase SQL Editor → click "Run without RLS"

UPDATE public.projects SET
  title = 'Kenya Bin Buddy',
  description = 'A smart municipal waste management platform for Kenyan cities — with real-time bin fill-level monitoring, GPS-tracked collection routes, driver workload scoring, and a citizen issue-reporting portal. Three user roles: Admin, Driver, and Citizen.',
  long_description = $desc$
## Overview

Kenya Bin Buddy is a full-stack smart waste management platform built to digitize municipal solid waste collection in Kenyan cities. It gives city administrators real-time visibility into every bin, automates route planning, tracks driver fatigue, and lets citizens report waste issues directly from their phones.

## User Roles

| Role | Primary Function |
|---|---|
| Admin | Full system management — bins, trucks, routes, schedules, users |
| Driver | View and execute assigned collection routes; share GPS location |
| Citizen | Monitor nearby bins; submit issue reports |

## Core Features

| Feature | Detail |
|---|---|
| Bin monitoring | Real-time fill-level map with color-coded status markers (empty / half / full / overflow) |
| Route management | Automatic and manual assignment modes with bin-selection and driver/truck linking |
| Driver workload | Fatigue scoring (weighted: hours, distance, routes, bins) via `calculate_fatigue_score()` DB function |
| Collection history | Immutable audit log written automatically by trigger on schedule completion |
| Citizen reports | Overflowing bins, illegal dumping, missed collections, damage — with GPS coordinates |
| Analytics | Recharts pie and bar charts for bin status distribution and fill-level trends |
| Real-time updates | Supabase Realtime channels push bin changes and route updates to all connected clients instantly |

## Architecture

```
Browser SPA (React 18 + TypeScript + Vite)
    │
    ├── TanStack React Query  (server-state cache)
    ├── React Hook Form + Zod (form validation)
    ├── Leaflet               (interactive bin map)
    └── Recharts              (analytics charts)
         │
         │ HTTPS / WebSocket
         ▼
    Supabase
    ├── Auth (JWT sessions)
    ├── PostgREST (auto-generated REST API)
    ├── Realtime (Postgres logical replication)
    └── PostgreSQL 13 + Row Level Security
```

No custom backend — all API calls go through Supabase''s PostgREST layer. Authorization is enforced at the database level via RLS policies, not just the React layer.

## Database Design (12 Tables)

```
profiles               — mirrors auth.users 1-to-1
user_roles             — multiple roles per user (admin | driver | citizen)
bins                   — fill_level (0–100), status, GPS coords, schedule refs
trucks                 — driver assignment, capacity, live GPS position
collection_schedules   — bin + truck + date/time + status lifecycle
collection_history     — immutable audit log (trigger-written on completion)
citizen_reports        — typed reports with optional bin link and GPS
route_assignments      — route lifecycle with automatic/manual mode flag
route_assignment_bins  — join table: which bins belong to each route
driver_activity        — shift data: hours, distance, bins_collected, fatigue_score
driver_notifications   — in-app notification system
system_settings        — single-row config (assignment_mode toggle)
```

**View:** `driver_workload_today` — aggregates today''s driver activity for the workload panel, avoiding N+1 queries.

**DB Functions:**
- `has_role(user_id, role)` — SECURITY DEFINER; used in RLS policies
- `calculate_fatigue_score(hours, routes, distance_km, bins)` — weighted 0–100 score
- `can_driver_accept_route(driver_uuid)` — guards route acceptance by workload

## Route Assignment Modes

**Automatic** — system suggests routes based on bin fill levels and GPS proximity. Admin reviews and confirms.

**Manual** — admin hand-picks bins and assigns them to a specific driver and truck. Both modes share the same `route_assignments` → `route_assignment_bins` join-table schema.

## Real-Time Integration

Supabase Realtime channels stream Postgres changes to all connected clients:

```
bins-changes              → Dashboard map and BinMap refresh
route-assignments-changes → Driver dashboard updates
driver-activity-changes   → DriverWorkloadPanel updates
schedules-realtime        → Driver schedule updates
```

Each channel calls `queryClient.invalidateQueries()` on the matching React Query key — keeping cache logic simple at the cost of one extra DB round-trip per event.

## Security Model

- **Auth:** Email/password only. Sessions are JWTs refreshed automatically by the Supabase client.
- **RLS:** Every table has Row Level Security enabled. Client-side role checks are UX only — enforcement lives in the DB.
- **Input validation:** Zod schemas on every form. Supabase column constraints provide the server-side net.
- **Anon key:** Safe to expose — scoped by RLS. Service-role key never included in the bundle.
  $desc$,
  tech_stack = ARRAY['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Leaflet', 'Recharts', 'TanStack Query', 'React Hook Form', 'Zod', 'shadcn/ui'],
  image_url = 'https://harrisononyangoaloo.vercel.app/images/smart-garbage.png'
WHERE title ILIKE '%smart%garbage%' OR title ILIKE '%bin%buddy%';

-- Verify the update
SELECT id, title, display_order, featured, image_url FROM public.projects
WHERE title ILIKE '%smart%garbage%' OR title ILIKE '%kenya%bin%' OR title ILIKE '%bin%buddy%';
