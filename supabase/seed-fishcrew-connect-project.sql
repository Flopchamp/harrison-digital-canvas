-- Project: FishCrewConnect
-- Run this in your Supabase SQL Editor to add this project

INSERT INTO public.projects (
  title,
  description,
  long_description,
  tech_stack,
  featured,
  display_order,
  demo_url,
  github_url,
  image_url
) VALUES (
  'FishCrewConnect',
  'A full-stack platform connecting boat owners with fishermen — featuring job postings, CV-based applications, real-time messaging via Socket.IO, and a web admin panel. Ships as a React Native mobile app, Node.js API, and React admin dashboard.',
  $desc$
## Overview

FishCrewConnect is a three-component platform built to digitize Kenya''s fishing industry hiring. Boat owners post fishing jobs; fishermen browse, apply with a CV, and communicate directly with owners — all from a mobile app.

**Live URLs:**
- Web Admin: [fish-crew-connect.vercel.app](https://fish-crew-connect.vercel.app)
- Backend API: [fishcrewconnect.onrender.com](https://fishcrewconnect.onrender.com)

## Architecture

The system has three independent deployments working together:

| Layer | Technology | Hosting |
|---|---|---|
| Mobile App | React Native + Expo Router | Standalone APK (Play Store) |
| Web Admin | React + Vite | Vercel |
| Backend API | Node.js + Express | Render |
| Database | MySQL via TiDB Cloud Serverless | TiDB Cloud (AP Southeast) |
| Real-time | Socket.IO | Same Render server |
| Auth | JWT tokens | — |
| File Uploads | Multer | Render ephemeral disk |

## User Roles

**Fisherman**
- Registers and builds a profile (bio, skills, specialties, location, rating)
- Browses job postings and applies with a CV file and cover letter
- Messages boat owners directly via real-time chat
- Receives in-app notifications and reviews

**Boat Owner**
- Posts fishing jobs (title, description, location, payment details, deadline)
- Reviews applications, accepts or rejects applicants
- Messages fishermen and leaves reviews after a job

**Admin (WebAdmin)**
- Manages user accounts and verification requests
- Oversees job postings, payments, and support tickets
- Controls system feature flags (registration, payments) via settings panel

## Database Schema (16 Tables)

```
users                    — core accounts (email, password_hash, user_type)
user_profiles            — extended profile (bio, skills, specialties, rating)
user_verification_requests — admin approval workflow
jobs                     — job postings with status lifecycle
job_applications         — applications with CV, cover letter, status
reviews                  — ratings between users post-job
messages                 — direct messaging between users
notifications            — in-app notification system
system_settings          — admin-controlled feature flags
payments / payment_statistics
support_tickets
otp_verifications / password_resets
```

## Mobile App (Expo)

- Package ID: `com.fishcrewconnect.app`
- Built and distributed via EAS (Expo Application Services)
- Key screens: Login, Register, Job List, Job Details, Apply (CV upload), Profile, Edit Profile, Messages, Notifications
- API calls routed through `config/api.js` pointing to the Render backend

## Key Technical Details

- **TiDB Cloud Serverless** — MySQL-compatible, serverless database over SSL on port 4000
- **Socket.IO** — real-time messaging co-hosted on the Express server
- **JWT** — stateless auth with tokens issued on login and validated per request
- **Multer** — handles CV and profile image uploads to Render''s ephemeral disk storage
- **CORS** — backend whitelists the Vercel admin URL and mobile app origins
- **UptimeRobot** — pings the Render backend every 5 minutes to prevent cold starts on the free tier
  $desc$,
  ARRAY['React Native', 'Expo', 'Node.js', 'Express', 'MySQL', 'TiDB Cloud', 'Socket.IO', 'JWT', 'React', 'Vite'],
  true,
  2,
  'https://fish-crew-connect.vercel.app',
  'https://github.com/Flopchamp/FishCrewConnect',
  'https://harrisononyangoaloo.vercel.app/images/fish-crew-connect.png'
);

-- Verify the project was created
SELECT id, title, display_order, featured, demo_url FROM public.projects WHERE title = 'FishCrewConnect';
